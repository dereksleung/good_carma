class UserRewarding < ApplicationRecord

  belongs_to :user
  belongs_to :reward
end
