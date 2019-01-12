class Company < ApplicationRecord

  after_create :create_tenant

  has_secure_password

  has_many :positions, dependent: :destroy
  has_many :users, through: :positions

  private

  def create_tenant
    Apartment::Tenant.create(name)
  end

end
