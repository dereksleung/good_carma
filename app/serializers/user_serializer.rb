class UserSerializer < ActiveModel::Serializer
  include ActionController
  attributes :id, :full_name, :first_name, :avatar, :child_post_count, :level, :badges

  # attribute :followed

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
  
  # def followed
  #   follow = ActiveRecord::Base.connection.exec_query("
  #   SELECT users.first_name
  #   FROM users
  #   INNER JOIN follows ON users.id = 28
  #   WHERE followed_user_id = 26
  #   ")
  #   if follow.any?
  #     true
  #   else 
  #     false
  #   end
  # end

  #   follow = User.find_by_sql("
  #   SELECT users.first_name
  #   FROM users
  #   INNER JOIN follows ON users.id = #{current_user.id}
  #   WHERE followed_user_id = #{object.id}
  #   ")
  #   if follow.any?
  #     true
  #   else 
  #     false
  #   end
  # end
end
