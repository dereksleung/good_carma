class Company < ApplicationRecord

  before_create :confirmation_token

  after_create :create_tenant

  has_secure_password

  # has_many :positions, dependent: :destroy
  has_many :users
  has_many :posts

  private

  def create_tenant
    Apartment::Tenant.create(name)
  end

  def confirmation_token
    if self.confirm_token.blank?
      self.confirm_token = SecureRandom.urlsafe_base64.to_s
    end
  end

end
