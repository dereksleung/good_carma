class CreateBadgeEarnings < ActiveRecord::Migration[5.2]
  def change
    create_table :badge_earnings do |t|
      t.references :user, foreign_key: true
      t.references :badge, foreign_key: true

      t.timestamps
    end
  end
end