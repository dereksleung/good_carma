class AddPointsStorageToUserAndPointsValueToBadges < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :points, :integer
    add_column :badges, :points, :integer
  end
end
