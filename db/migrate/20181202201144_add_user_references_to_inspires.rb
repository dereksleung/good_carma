class AddUserReferencesToInspires < ActiveRecord::Migration[5.2]
  def change
    add_reference :inspires, :user, foreign_key: true
  end
end
