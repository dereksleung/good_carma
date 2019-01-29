class CommentSerializer < ActiveModel::Serializer
  attributes :slug, :body, :c_user, :created_at, :p_slug

  belongs_to :user
  belongs_to :post

  def p_slug
    object.post.slug
  end

  def created_at
    object.created_at.to_formatted_s(:long)
  end

  def c_user
    object.user.full_name
  end


end
