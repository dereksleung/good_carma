class UserQuesting < ApplicationRecord
  belongs_to :user
  belongs_to :quest
end
