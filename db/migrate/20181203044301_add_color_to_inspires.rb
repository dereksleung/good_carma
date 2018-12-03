class AddColorToInspires < ActiveRecord::Migration[5.2]
  def change
    add_column :inspires, :color, :string
  end
end
