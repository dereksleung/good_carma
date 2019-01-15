class Follow < ApplicationRecord
  belongs_to :follower, foreign_key: "follower_id", class_name: "User", inverse_of: :followers
  belongs_to :followed_user, foreign_key: "followed_user_id", class_name: "User", inverse_of: :followed_users
end
