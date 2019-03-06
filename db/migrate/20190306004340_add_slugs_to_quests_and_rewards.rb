class AddSlugsToQuestsAndRewards < ActiveRecord::Migration[5.2]
  def change
    add_column :quests, :slug, :string
    add_index :quests, :slug, unique: true

    add_column :quest_goals, :slug, :string
    add_index :quest_goals, :slug, unique: true

    add_column :rewards, :slug, :string
    add_index :rewards, :slug, unique: true
  end
end
