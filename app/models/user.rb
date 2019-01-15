class User < ApplicationRecord

  before_create :confirmation_token

  has_one_attached :avatar_image
  has_one_attached :splash_image

  has_secure_password
  has_many :posts
  has_many :child_posts, through: :posts  
  has_many :comments

  has_many :badge_earnings, class_name: "BadgeEarning", dependent: :destroy
  has_many :badges, through: :badge_earnings

  has_many :positions, dependent: :destroy
  has_many :companies, through: :positions

  # Setting foreign_key: :followed_user_id here means that in each database record representing a follow, a user U's followers will be the follower_id, while U will be the followed_user_id. 
  # class_name in this context means which class to find the follow database record in.
  has_many :follower_follows, foreign_key: :followed_user_id, class_name: "Follow" 
  
  has_many :followers, through: :follower_follows, source: :follower

  # Setting foreign_key: :follower_id here means that in each database record representing a follow, a user U is the follower and will be the follower_id, and the followed_users will be the follower_users_id's.
  # class_name in this context means which class to find the follow database record in.
  has_many :followed_user_follows, foreign_key: :follower_id, class_name: "Follow"

  has_many :followed_users, through: :followed_user_follows, source: :followed_user
  

  def full_name
    "#{first_name} #{last_name}".strip
  end

  # has_many :inspires, dependent: :destroy
  # has_many :posts_inspiring_them, through: :inspires, source: :post

  private

  def confirmation_token
    if self.confirm_token.blank?
      self.confirm_token = SecureRandom.urlsafe_base64.to_s
    end
  end

end
