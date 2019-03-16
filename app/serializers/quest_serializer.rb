class QuestSerializer < ActiveModel::Serializer

  include Rails.application.routes.url_helpers
  
  attributes :slug, :title, :description

  attribute :image

  has_many :quest_goals
  belongs_to :company

  def image
    if Rails.env.development?
      return "localhost:3000#{rails_blob_url(object.image, only_path: true)}" if object.image.attached?
    else
      object.image.service_url if object.image.attached?
    end
  end

end
