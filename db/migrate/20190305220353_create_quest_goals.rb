class CreateQuestGoals < ActiveRecord::Migration[5.2]
  def change
    create_table :quest_goals do |t|
      t.string :title
      t.text :description
      t.integer :points
      t.boolean :repeatable
      t.integer :max_repeats
      t.references :quest, foreign_key: true
      t.timestamps
    end
    
  end
end
