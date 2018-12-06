class User < ApplicationRecord

  has_secure_password
  has_many :posts
  has_many :child_posts, through: :posts  
  has_many :comments

  has_many :badge_earnings, class_name: "BadgeEarning", dependent: :destroy
  has_many :badges, through: :badge_earnings
  

  def full_name
    "#{first_name} #{last_name}".strip
  end

  # has_many :inspires, dependent: :destroy
  # has_many :posts_inspiring_them, through: :inspires, source: :post
end
