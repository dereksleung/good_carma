class PostRelation < ApplicationRecord

  belongs_to :parent_post, foreign_key: "parent_post_id", class_name: "Post", inverse_of: :parent_posts

  belongs_to :child_post, foreign_key: "child_post_id", class_name: "Post", inverse_of: :child_posts

  

end
