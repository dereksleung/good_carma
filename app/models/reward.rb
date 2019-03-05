class Reward < ApplicationRecord

  has_many :user_rewardings, dependent: :destroy
  has_many :rewards, through: :user_rewardings
end
