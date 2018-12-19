class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :updated_at, :picture_url, :color, :comments, :inspire_count, :gold_inspires, :silver_inspires, :p_user_full_name, :p_user_id

  # has_many :comments
  belongs_to :user


  has_many :child_posts, through: :post_relations

  def comments
    comments = []
    object.comments.each do |c|
      comments << { body: c.body,
                    c_user: c.user.full_name,
                    created_at: c.created_at.to_formatted_s(:long),
                    updated_at: c.updated_at.to_formatted_s(:long)
                  }
    end
    comments
  end

  def p_user_full_name
    object.user.full_name
  end

  def p_user_id
    object.user.id
  end

  def created_at
    object.created_at.to_formatted_s(:long)
  end

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
