class CreatePostRelations < ActiveRecord::Migration[5.2]
  def change
    create_table :post_relations do |t|
      t.integer :parent_post_id
      t.integer :child_post_id

      t.timestamps
    end

    add_foreign_key :post_relations, :posts, column: :parent_post_id
    add_foreign_key :post_relations, :posts, column: :child_post_id

    add_index :post_relations, [:parent_post_id, :child_post_id], unique: true
  end
end
