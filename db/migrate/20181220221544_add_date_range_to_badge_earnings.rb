class AddDateRangeToBadgeEarnings < ActiveRecord::Migration[5.2]
  def change
    add_column :badge_earnings, :Week, :daterange
    add_column :badge_earnings, :Week_s, :string
  end
end
