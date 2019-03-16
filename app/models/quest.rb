class Quest < ApplicationRecord

  belongs_to :company
  has_many :quest_goals

  has_many :user_questings, dependent: :destroy
  has_many :users, through: :user_questings

  has_one_attached :image

  accepts_nested_attributes_for :quest_goals

  extend FriendlyId
  friendly_id :title, use: [:slugged, :history, :finders]
end
