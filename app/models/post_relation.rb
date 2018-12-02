class PostRelation < ApplicationRecord

  belongs_to :parent_post, foreign_key: "parent_post_id", class_name: "Post"

  belongs_to :child_post, foreign_key: "child_post_id", class_name: "Post"

end
