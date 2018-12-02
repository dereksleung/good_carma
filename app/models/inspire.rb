class Inspire < ApplicationRecord
  belongs_to :user
  belongs_to :inspiring_entry, polymorphic: true
end
