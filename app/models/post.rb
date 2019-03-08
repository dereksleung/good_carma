class Post < ApplicationRecord
  include Rails.application.routes.url_helpers

  validates :body, presence: true
  validates :user, presence: true
  validates :company, presence: true

  belongs_to :user
  belongs_to :company
  attr_reader :gen_query

  has_one_attached :image

  has_many :comments, dependent: :destroy
  has_many :inspires, as: :inspiring_entry, dependent: :destroy

  # :parent_relations "names" the PostRelation join table for accessing through the :parent_posts association
  has_many :parent_relations, foreign_key: :child_post_id, class_name: "PostRelation", dependent: :destroy

  # source: :parent_post matches with the belongs_to :parent_post identification in the PostRelation model
  has_many :parent_posts, through: :parent_relations, source: :parent_post#, inverse_of :parent_post
  
  # :child_relations "names" the PostRelation join table for accessing through the :child_posts association
  has_many :child_relations, foreign_key: :parent_post_id, class_name: "PostRelation", dependent: :destroy

  # source: :child_post matches with the belongs_to :child_post identification in the PostRelation model
  has_many :child_posts, through: :child_relations, source: :child_post#, inverse_of :child_post

  extend FriendlyId
  friendly_id :body, use: [:slugged, :history, :finders]

  def attach_avatar_image(hash_with_user_id, user)
    
    if Rails.env.development?
      hash_with_user_id["avatar_image"] = "http://localhost:3000#{rails_blob_url(user.avatar_image, only_path: true)}" if user.avatar_image.attached?
    else 
      hash_with_user_id["avatar_image"] = rails_blob_url(user.avatar_image, only_path: true) if user.avatar_image.attached?
    end
  end
  
  # add_child_posts is my prototype recursive version of the `generations` method below. 
  # e.g. parent_post = @gen_query[:child_posts][1], parent_post has key-value pair child_posts => [] to signal it needs child_posts attached.
  def add_child_posts(parent_post)
    
    if parent_post.has_key?("child_posts")
      children_A_Record_Objects = parent_post.child_posts
      children_A_Record_Objects.each_with_index {|child, ind|
        parent_post[:child_posts][ind] = child.attributes
        if parent_post[:child_posts][ind].child_posts.any?
          # Set parent_post to a new target post inside the nested hash of the tree.
          new_parent_post = parent_post[:child_posts][ind]
          new_parent_post[:child_posts] = []
          add_child_posts(new_parent_post)
        end
      } 
    end
  end

  def attach_inspires(start_post_id, start_post_hash)
    inspires_sql = <<-SQL
    SELECT inspires.color, inspires.created_at, (users.first_name || ' ' ||users.last_name) AS full_name, users.slug
      FROM inspires
      INNER JOIN users ON inspires.user_id = users.id
      WHERE inspires.inspiring_entry_type = 'Post' AND inspires.inspiring_entry_id = #{start_post_id.to_i}
    SQL

    start_post_hash["inspires"] = ActiveRecord::Base.connection.exec_query(inspires_sql)
    start_post_hash["inspires"].each { |insp|
      u = User.friendly.find(insp["slug"])
      if Rails.env.development?
        insp["avatar_image"] = "http://localhost:3000#{rails_blob_url(u.avatar_image, only_path: true)}" if u.avatar_image.attached?
      else 
        insp["avatar_image"] = rails_blob_url(u.avatar_image, only_path: true) if u.avatar_image.attached?
      end
      }
  end

    # This expects positive numbers or zero for both how many generations above and below to query.
  def generations(above, below)
    # Eventual goal: Function must set an initial post object that contains the record of either the starting post or the highest ancestor, and an empty child_posts array. Then it must query the child_posts, and push them to the child_posts array in this initial post object. If there are multiple children, and each has grandchildren, the function must iterate over each child, and push the grandchildren to the right child. This should continue for every generation queried.

    # Break into several functions that add more keys-value pairs to the object as needed.
    total_gens = below - (above * -1) 
    
    start_post = self
    start_post_hash = start_post.attributes
    user = User.find(start_post_hash["user_id"])
    start_post_hash["full_name"] = user.full_name
    start_post_hash["user_slug"] = user.slug
    start_post_hash.delete("user_id")

    attach_avatar_image(start_post_hash, user)
    
    start_post_id = self.id

    attach_inspires(start_post_id, start_post_hash)

    @gen_query = start_post_hash
    @gen_query[:child_posts] = []

    
    # For every child that has further children, we will set a key-value pair child_posts => [] to mark that we need to query its children too later.
    start_post.child_posts.each do |child| 
      child_hash = child.attributes
      user = User.find(child_hash["user_id"])
      child_hash["full_name"] = user.full_name
      child_hash["user_slug"] = user.slug
      child_hash.delete("user_id")
      attach_avatar_image(child_hash, user)
      attach_inspires(child_hash["id"], child_hash)

      if child.child_posts.any?
        child_hash[:child_posts] = []
      end

      @gen_query[:child_posts] << child_hash
        
    end

    # child_posts should now be an array of hashes
    @gen_query[:child_posts].map do |child|

      curr_target_id = child["id"].to_i

      # Tricky bit: I used a single = sign here earlier, which made this an assignment operator instead of a comparison operator. So child[:child_posts] actually got its value changed to nil.
      unless child[:child_posts] === nil
        
        start_post = Post.find(curr_target_id)
        start_post.child_posts.each do |grandchild|
          gc_hash = grandchild.attributes
          user = User.find(gc_hash["user_id"])
          gc_hash["full_name"] = user.full_name
          gc_hash["user_slug"] = user.slug
          gc_hash.delete("user_id")
          attach_avatar_image(gc_hash, user)
          gc_hash[:prnt_id] = curr_target_id
          attach_inspires(gc_hash["id"],gc_hash)

          if grandchild.child_posts.any?
            gc_hash[:child_posts] = []
          end

          target_hash = @gen_query[:child_posts].find {|post| post["id"] == curr_target_id}
          target_hash[:child_posts] << gc_hash

        end
      end
    end

    return @gen_query
      # iterate_times.times do 

  end

  # I'm investigating using includes to eager load all child_posts, but when logging the result of includes, it appears that it flattens and loses the structure of what is related to what. While I could solve that by 
  # 1) storing the parent_ids on each post record directly, or
  # 2) querying the PostRelation join table instead,
  # both of these solutions involve reconstructing the relationships of what is related to what elsewhere. I am not sure if that is faster, I would guess that server side operations in the database and model are faster. 
  def self.i_generations(post_id)
    # start_post = self
    # post_id = self.id
    @gen_query = Post.includes(child_posts: {child_posts: :child_posts})
    # instance_eval
  end

end
