class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :first_name, :avatar, :child_post_count, :level, :badges

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
