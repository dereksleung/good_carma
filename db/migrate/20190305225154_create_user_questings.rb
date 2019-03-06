class CreateUserQuestings < ActiveRecord::Migration[5.2]
  ActiveRecord::Schema.define do
    enable_extension 'hstore' unless extension_enabled?('hstore')
    create_table :user_questings do |t|
      t.references :user, foreign_key: true, index: true
      t.references :quest, foreign_key: true, index: true
      t.hstore 'completed_goals'
      t.timestamps
    end
  end
end
