class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :updated_at, :color

  has_many :comments
  belongs_to :user
  has_many :inspires

  has_many :child_posts, through: :post_relations

  def inspire_count
    count = 0
    object.inspires.size
  end

  # This sets up a custom attribute to serialize
  def child_post_count
    count = 0
    # object refers to the User model as we are in the User serializer.
    object.child_posts.each do |p|
      count += p.child_posts.size
    end
    count
  end

end
