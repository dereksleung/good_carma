class Badge < ApplicationRecord

  has_many :badge_earnings, class_name: "BadgeEarning", dependent: :destroy
  has_many :users, through: :badge_earnings
end
