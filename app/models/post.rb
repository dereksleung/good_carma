class Post < ApplicationRecord
  belongs_to :user
  attr_reader :gen_query

  has_many :comments
  has_many :inspires, as: :inspiring_entry

  has_and_belongs_to_many(:child_posts,
    class_name: "Post",
    join_table: :post_relations,
    foreign_key: :parent_post_id,
    association_foreign_key: :child_post_id)

  has_and_belongs_to_many(:parent_posts,
    class_name: "Post",
    join_table: :post_relations,
    foreign_key: :child_post_id,
    association_foreign_key: :parent_post_id)
  
  # has_many :inspires, dependent: :destroy

  # has_many :inspired_users, through: :likes, source: :user


  # This expects positive numbers or zero for both how many generations above and below to query.
  def generations(above, below)
    # Eventual goal: Function must set an initial post object that contains the record of either the starting post or the highest ancestor, and an empty child_posts array. Then it must query the child_posts, and push them to the child_posts array in this initial post object. If there are multiple children, and each has grandchildren, the function must iterate over each child, and push the grandchildren to the right child. This should continue for every generation queried.


    # Break into several functions that add more keys-value pairs to the object as needed.
    total_gens = below - (above * -1) 
    
    start_post = self
    start_post_hash = start_post.attributes
    @gen_query = start_post_hash
    @gen_query[:child_posts] = []

    
    # For every child that has further children, we will set a key-value pair child_posts => [] to mark that we need to query its children too later.
    start_post.child_posts.each do |child| 
      child_hash = child.attributes

      if child.child_posts.any?
        child_hash[:child_posts] = []

      # call recursive method here?
      end

      @gen_query[:child_posts] << child_hash
        
    end

    # use eval method to 
    # child_posts should now be an array of hashes
    @gen_query[:child_posts].map do |child|

      curr_target_id = child["id"].to_i

      # Tricky bit: I used a single = sign here earlier, which made this an assignment operator instead of a comparison operator. So child[:child_posts] actually got its value changed to nil.
      unless child[:child_posts] === nil
        
        start_post = Post.find(curr_target_id)
        start_post.child_posts.each do |grandchild|
          gc_hash = grandchild.attributes
          gc_hash[:prnt_id] = curr_target_id

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


  # has_many :inspiractions, class_name: "Post", foreign_key: "parent_id"

  # belongs_to :parent, class_name: "Post"

  # # :parent_relations "names" the PostRelation join table for accessing through the :parent_posts association
  # has_many :parent_relations, foreign_key: :parent_post_id, class_name: "PostRelation"

  # # source: :parent_post matches with the belongs_to :parent_post identification in the PostRelation model
  # has_many :parent_posts, through: :parent_relations, source: :post
  
  # # :child_relations "names" the PostRelation join table for accessing through the :child_posts association
  # has_many :child_relations, foreign_key: :child_post_id, class_name: "PostRelation"

  # # source: :child_post matches with the belongs_to :child_post identification in the PostRelation model
  # has_many :child_posts, through: :child_relations, source: :post
end
