class ChangeUserPointsColumnToDefaultZero < ActiveRecord::Migration[5.2]
  def change
    change_column_default :users, :points, 0
  end
end
