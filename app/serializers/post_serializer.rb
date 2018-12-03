class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :updated_at, :color

  has_many :comments
  belongs_to :user
  has_many :inspires
end
