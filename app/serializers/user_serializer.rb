class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :avatar, :child_post_count, :level, :badges

  has_many :posts
  has_many :child_posts, through: :posts

  # has_many :badge_earnings
  has_many :badges, through: :badge_earnings

  # This sets up a custom attribute to serialize
  def child_post_count
    count = 0
    # object refers to the User model as we are in the User serializer.
    object.posts.each do |p|
      count += p.child_posts.size
    end
    count
  end
end