class AddConfirmedToCompany < ActiveRecord::Migration[5.2]
  def change
    add_column :companies, :confirmed, :boolean, default: false
  end
end
