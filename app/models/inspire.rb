class Inspire < ApplicationRecord
  belongs_to :user
  belongs_to :inspiring_entry, polymorphic: true

  validates :user, presence: true
  validates :inspiring_entry, presence: true
  validates :inspiring_entry_type, presence: true, inclusion: { in: %w(Post Comment)}
  
end
