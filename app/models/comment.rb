class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
  has_many :inspires, as: :inspiring_entry

  validates :body, presence: true
  validates :user, presence: true
  validates :post, presence: true

  extend FriendlyId
  friendly_id :body_plus_integer, use: [:slugged, :history, :finders]

  def body_plus_integer
    "#{body}-#{rand(0..1000)}"
  end
end
