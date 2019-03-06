class CreateRewards < ActiveRecord::Migration[5.2]
  def change
    create_table :rewards do |t|
      t.string :title
      t.text :description
      t.integer :cost
      t.boolean :repeatable
      t.integer :max_repeats
      t.timestamps
    end
  end
end
