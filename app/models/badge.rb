class Badge < ApplicationRecord

  validates :image, presence: true, on: :update
  validates :name, presence: true

  has_many :badge_earnings, class_name: "BadgeEarning", dependent: :destroy
  has_many :users, through: :badge_earnings

  has_one_attached :image
end
