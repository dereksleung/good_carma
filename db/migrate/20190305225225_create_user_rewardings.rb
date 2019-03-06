class CreateUserRewardings < ActiveRecord::Migration[5.2]
  def change
    create_table :user_rewardings do |t|
      t.references :user, foreign_key: true, index: true
      t.references :reward, foreign_key: true, index: true
      t.boolean :show_on_profile
      t.boolean :show_all_details
      t.timestamps
    end
  end
end
