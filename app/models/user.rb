class User < ApplicationRecord

  before_create :confirmation_token

  has_one_attached :avatar_image

  has_secure_password
  has_many :posts
  has_many :child_posts, through: :posts  
  has_many :comments

  has_many :badge_earnings, class_name: "BadgeEarning", dependent: :destroy
  has_many :badges, through: :badge_earnings

  has_many :positions, dependent: :destroy
  has_many :companies, through: :positions
  

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
