class CreateQuests < ActiveRecord::Migration[5.2]
  ActiveRecord::Schema.define do
    enable_extension 'hstore' unless extension_enabled?('hstore')
    create_table :quests do |t|
      t.string :title
      t.text :description
      t.integer :finished_bonus_points
      t.boolean :repeatable
      t.integer :max_repeats
      t.hstore 'all_quest_goals'
      t.timestamps
    end
  end
end
