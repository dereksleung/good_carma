class CreateInspires < ActiveRecord::Migration[5.2]
  def change
    create_table :inspires do |t|
      
      t.string :type
      t.references :user, foreign_key: true
      t.references :post, foreign_key: true
      t.references :comment, foreign_key: true

      t.timestamps
    end
  end
end
