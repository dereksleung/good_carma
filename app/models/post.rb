class Post < ApplicationRecord
  belongs_to :user

  # :parent_relations "names" the PostRelation join table for accessing through the :parent_posts association
  has_many :parent_relations, foreign_key: parent_post_id, class_name: "PostRelation"

  # source: :parent_relation matches with the belongs_to :parent_relation identification in the PostRelation model
  has_many :parent_posts, through: :parent_relations, source: :parent_relation
  
  # :child_relations "names" the PostRelation join table for accessing through the :child_posts association
  has_many :child_relations, foreign_key: child_post_id, class_name: "PostRelation"

  # source: :child_relation matches with the belongs_to :child_relation identification in the PostRelation model
  has_many :child_posts, through: :child_relations, source:child_relation
end
