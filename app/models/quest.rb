class Quest < ApplicationRecord

  has_many :quest_goals

  has_many :user_questings, dependent: :destroy
  has_many :users, through: :user_questings
end
