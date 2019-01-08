class Company < ApplicationRecord
  has_secure_password

  has_many :positions, dependent: :destroy
  has_many :users, through: :positions
end
