class Post < ApplicationRecord
  belongs_to :user

  # has_and_belongs_to_many(:posts,
  #   join_table: :post_relations,
  #   foreign_key: :parent_post_id,
  #   association_foreign_key: :child_post_id)
  

  # has_many :inspiractions, class_name: "Post", foreign_key: "parent_id"

  belongs_to :parent, class_name: "Post"

  # # :parent_relations "names" the PostRelation join table for accessing through the :parent_posts association
  # has_many :parent_relations, foreign_key: :parent_post_id, class_name: "PostRelation"

  # # source: :parent_post matches with the belongs_to :parent_post identification in the PostRelation model
  # has_many :parent_posts, through: :parent_relations, source: :parent_post
  
  # # :child_relations "names" the PostRelation join table for accessing through the :child_posts association
  # has_many :child_relations, foreign_key: :child_post_id, class_name: "PostRelation"

  # # source: :child_post matches with the belongs_to :child_post identification in the PostRelation model
  # has_many :child_posts, through: :child_relations, source: :child_post
end
