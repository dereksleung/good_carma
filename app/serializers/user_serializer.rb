class UserSerializer < ActiveModel::Serializer
  # include ActionController
  include Rails.application.routes.url_helpers

  attributes :slug, :full_name, :first_name, :avatar, :avatar_image, :splash_image, :child_post_count, :followed_users_count, :followers_count,:level, :badges

  attribute :avatar_image

  has_many :posts
  # has_many :comments, through: :posts
  
  has_many :child_posts, through: :posts

  # has_many :badge_earnings
  has_many :badges, through: :badge_earnings

  # def posts
  #   posts = []
  #   ps = object.posts
  #   ps.each do |p|
  #     p_obj = p.attributes
  #     p_obj["comments"] = []
  #     p.comments.each do |c|
  #       p_obj["comments"] << c.attributes
  #     end
  #     posts << p_obj
  #   end
  # end

  def badges
    object.badges.each {|badge|
      if Rails.env.development?
        badge["image"] = "http://localhost:3000#{rails_blob_url(badge.image, only_path: true)}" if badge.image.attached?
      else 
        badge["image"] = rails_blob_url(badge.image, only_path: true) if badge.image.attached?
      end
    }
  end

  def followers_count
    object.followers.size
  end

  def followed_users_count
    object.followed_users.size
  end

  # This sets up a custom attribute to serialize
  def child_post_count
    count = 0
    # object refers to the User model as we are in the User serializer.
    object.posts.each do |p|
      count += p.child_posts.size
    end
    count
  end
  
  def avatar_image
    if Rails.env.development?
      return "http://localhost:3000#{rails_blob_url(object.avatar_image, only_path: true)}" if object.avatar_image.attached?
    else 
      rails_blob_url(object.avatar_image, only_path: true) if object.avatar_image.attached?
    end
  end

  def splash_image
    if Rails.env.development?
      return "http://localhost:3000#{rails_blob_url(object.splash_image, only_path: true)}" if object.splash_image.attached?
    else 
      rails_blob_url(object.splash_image, only_path: true) if object.splash_image.attached?
    end
  end

end
