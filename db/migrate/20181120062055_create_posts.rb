class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.text :body
      t.references :user, foreign_key: true
      t.string :picture_url

      t.timestamps
    end
  end
end
