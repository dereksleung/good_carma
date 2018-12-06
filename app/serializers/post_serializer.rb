class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :updated_at, :color, :inspire_count, :gold_inspires, :silver_inspires

  has_many :comments
  belongs_to :user


  has_many :child_posts, through: :post_relations

  def inspire_count

    object.inspires.size
  end

  def gold_inspires
    object.inspires.where("color = ?", "gold").size
  end

  def silver_inspires
    object.inspires.where("color = ?", "silver").size
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
