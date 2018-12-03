class User < ApplicationRecord

  has_secure_password
  has_many :posts
  has_many :child_posts, through: :posts  
  has_many :comments

  def full_name
    "#{first_name} #{last_name}".strip
  end

  # has_many :inspires, dependent: :destroy
  # has_many :posts_inspiring_them, through: :inspires, source: :post
end
