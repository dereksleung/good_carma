class Reward < ApplicationRecord

  has_many :user_rewardings, dependent: :destroy
  has_many :rewards, through: :user_rewardings

  has_one_attached :image

  extend FriendlyId
  friendly_id :title, use: [:slugged, :history, :finders]
end
