class PostSerializer < ActiveModel::Serializer

  include Rails.application.routes.url_helpers

  attributes :slug, :body, :created_at, :updated_at, :picture_url, :color, :comments, :inspire_count, :gold_inspires, :silver_inspires, :p_user_full_name, :p_user_id 
  
  attribute :image
  #, :gen_query

  # has_many :comments
  belongs_to :user


  has_many :child_posts, through: :post_relations

  # def gen_query
  #   @gen_query = Post.includes(child_posts: {child_posts: :child_posts})#.find(object.id)
  # end

  def image
    if Rails.env.development?
      return "http://localhost:3000#{rails_blob_url(object.image, only_path: true)}" if object.image.attached?
    else 
      object.image.service_url if object.image.attached?
    end
  end

  def c_user_avatar_image(comment)
    if Rails.env.development?
      return "http://localhost:3000#{rails_blob_url(comment.user.avatar_image, only_path: true)}" if comment.user.avatar_image.attached?
    else 
      comment.user.avatar_image.service_url if comment.user.avatar_image.attached?
    end
  end

  def comments
    comments = []
    object.comments.each do |c|
      comments << { body: c.body,
                    c_user: c.user.full_name,
                    c_user_slug: c.user.slug,
                    c_slug: c.slug,
                    created_at: c.created_at.to_formatted_s(:long),
                    updated_at: c.updated_at.to_formatted_s(:long),
                    c_user_avatar_image: c_user_avatar_image(c) 
                  }
    end
    comments
  end

  def p_user_full_name
    object.user.full_name
  end

  def p_user_id
    object.user.slug
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

  def child_post_count
    object.child_posts.size
  end

end
