class UserSerializer < ActiveModel::Serializer

  include Rails.application.routes.url_helpers

  attributes :slug, :full_name, :first_name, :avatar, :avatar_image, :splash_image, :child_post_count, :followed_users_count, :followers_count,:level, :badges

  attribute :avatar_image

  has_many :posts
  # has_many :comments, through: :posts
  
  has_many :child_posts, through: :posts


  has_many :badges, through: :badge_earnings

  def badges
    object.badges.each {|badge|
      if Rails.env.development?
        badge["image"] = "http://localhost:3000#{rails_blob_url(badge.image, only_path: true)}" if badge.image.attached?
      else 
        badge["image"] = badge.service_url if badge.image.attached?
      end
    }
  end

  def followers_count
    object.followers.size
  end

  def followed_users_count
    object.followed_users.size
  end

  
  def child_post_count
    count = 0
    object.posts.each do |p|
      count += p.child_posts.size
    end
    count
  end
  
  def avatar_image
    if Rails.env.development?
      return "http://localhost:3000#{rails_blob_url(object.avatar_image, only_path: true)}" if object.avatar_image.attached?
    else 
      object.avatar_image.service_url if object.avatar_image.attached?
    end
  end

  def splash_image
    if Rails.env.development?
      return "http://localhost:3000#{rails_blob_url(object.splash_image, only_path: true)}" if object.splash_image.attached?
    else 
      object.splash_image.service_url if object.splash_image.attached?
    end
  end

end
