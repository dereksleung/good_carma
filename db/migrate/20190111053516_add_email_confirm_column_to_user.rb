class AddEmailConfirmColumnToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :confirmed, :boolean, default: false
    add_column :users, :confirm_token, :string
  end
end
