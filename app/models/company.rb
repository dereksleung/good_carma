class Company < ApplicationRecord

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  
  validates :name, presence: true
  
  validates :email, presence: true,
                    uniqueness: true,
                    format: VALID_EMAIL_REGEX

  before_create :confirmation_token

  # after_create :create_tenant

  has_secure_password

  has_many :positions, dependent: :destroy
  has_many :users, dependent: :destroy
  has_many :posts, dependent: :destroy

  private

  def create_tenant
    # Apartment::Tenant.create(name)
  end

  def confirmation_token
    if self.confirm_token.blank?
      self.confirm_token = SecureRandom.urlsafe_base64.to_s
    end
  end

end
