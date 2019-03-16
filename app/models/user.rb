class User < ApplicationRecord

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  
  validates :first_name, presence: true
  # validates :last_name, presence: true
  # Currently, creating companies simultaneously creates normal user profiles with the company information, filling in company name as first_name. Companies do not fill last_name as they are not guaranteed to have two words. 
  validates :email, presence: true,
                    uniqueness: true,
                    format: VALID_EMAIL_REGEX

  before_create :confirmation_token

  has_one_attached :avatar_image
  has_one_attached :splash_image

  has_secure_password
  has_many :posts
  has_many :child_posts, through: :posts  
  has_many :comments

  has_many :user_questings, dependent: :destroy
  has_many :quests, through: :user_questings

  has_many :badge_earnings, class_name: "BadgeEarning", dependent: :destroy
  has_many :badges, through: :badge_earnings

  # has_many :positions, dependent: :destroy
  belongs_to :company

  # Setting foreign_key: :followed_user_id here means that in each database record representing a follow, a user U's followers will be the follower_id, while U will be the followed_user_id. 
  # class_name in this context means which class to find the follow database record in.
  has_many :follower_follows, foreign_key: :followed_user_id, class_name: "Follow" 
  
  has_many :followers, through: :follower_follows, source: :follower

  # Setting foreign_key: :follower_id here means that in each database record representing a follow, a user U is the follower and will be the follower_id, and the other users that U follows will be the followed_user_id's.
  # class_name in this context means which class to find the follow database record in.
  has_many :followed_user_follows, foreign_key: :follower_id, class_name: "Follow"

  has_many :followed_users, through: :followed_user_follows, source: :followed_user
  
  def self.search(query) 
    where("first_name ILIKE ?", "#{query}%").or(User.where("last_name ILIKE ?", "#{query}%")).or(User.where("first_name || ' ' || last_name ILIKE ?", "%#{query}%"))
  end

  def self.current
    Thread.current[:user]
  end

  def self.current=(user)
    Thread.current[:user] = user
  end

  def current_user
    if session[:user_id].present?
      @current_user ||= User.find(session[:user_id])
    end
  end

  def append_followed(actv_rcrd_obj, curr_user)
    user_hash = actv_rcrd_obj.attributes
    user_hash["followed"] = followed?(curr_user)
    return user_hash
  end

  def followed?(curr_user)
    follow = User.find_by_sql("
    SELECT users.first_name
    FROM users
    INNER JOIN follows ON users.id = #{curr_user.id}
    WHERE followed_user_id = #{self.id}
    ")
    if follow.any?
      true
    else 
      false
    end
  end
  
  def full_name
    "#{first_name} #{last_name}".strip
  end

  # has_many :inspires, dependent: :destroy
  # has_many :posts_inspiring_them, through: :inspires, source: :post
  
  extend FriendlyId
  friendly_id :full_name_plus_integer, use: [:slugged, :history, :finders]

  def full_name_plus_integer
    "#{full_name}-#{rand(0..1000)}"
  end

  private

  def confirmation_token
    if self.confirm_token.blank?
      self.confirm_token = SecureRandom.urlsafe_base64.to_s
    end
  end



end
