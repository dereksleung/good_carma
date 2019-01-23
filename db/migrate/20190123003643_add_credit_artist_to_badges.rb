class AddCreditArtistToBadges < ActiveRecord::Migration[5.2]
  def change
    add_column :badges, :credit_artist, :string
  end
end
