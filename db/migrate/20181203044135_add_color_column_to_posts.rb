class AddColorColumnToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :color, :string
  end
end
