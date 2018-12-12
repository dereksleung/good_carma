class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :c_user, :created_at 

  belongs_to :user
  belongs_to :post

  def created_at
    object.created_at.to_formatted_s(:long)
  end

  def c_user
    object.user.full_name
  end


end
