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

  def attach_avatar_image(hash, user)
    
    if Rails.env.development?
      hash["avatar_image"] = "http://localhost:3000#{rails_blob_url(user.avatar_image, only_path: true)}" if user.avatar_image.attached?
    else 
      hash["avatar_image"] = rails_blob_url(user.avatar_image, only_path: true) if user.avatar_image.attached?
    end
  end

  def attach_fullname_and_slug(parent_hash, user)
    parent_hash["full_name"] = user.full_name
    parent_hash["user_slug"] = user.slug
    parent_hash.delete("user_id")
    parent_hash
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

  def add_child_posts(parent_AR_obj, target_parent_hash, levels_left)
    if levels_left > 0
      if target_parent_hash.has_key?(:child_posts)
        children_A_Record_Objects = parent_AR_obj.child_posts
        children_A_Record_Objects.each_with_index {|child_ARO, ind|
          target_parent_hash[:child_posts][ind] = child_ARO.attributes
          new_target_parent_hash = target_parent_hash[:child_posts][ind]
          user = User.find(new_target_parent_hash["user_id"])
          attach_fullname_and_slug(new_target_parent_hash, user)
          attach_avatar_image(new_target_parent_hash, user)
          attach_inspires(new_target_parent_hash["id"], new_target_parent_hash)
          new_target_parent_hash.delete("id")
          if child_ARO.child_posts.any?
            # Set parent_post to a new target post inside the nested hash of the tree.
            new_target_parent_hash[:child_posts] = []
            new_levels_left = levels_left - 1
            add_child_posts(child_ARO, new_target_parent_hash, new_levels_left)
          end
        } 
      end
    end
    target_parent_hash
  end

  def rcrsv_generations(parent_AR_obj, levels)
    parent_hash = parent_AR_obj.attributes
    @rcrsv_gen_query = parent_hash
    user = User.find(parent_hash["user_id"])
    
    attach_fullname_and_slug(parent_hash, user)
    attach_avatar_image(parent_hash, user)
    attach_inspires(parent_hash["id"], parent_hash)
    parent_hash.delete("id")

    if parent_AR_obj.child_posts.any?
      @rcrsv_gen_query[:child_posts] = []
    end

    add_child_posts(parent_AR_obj, @rcrsv_gen_query, levels)

    @rcrsv_gen_query
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
