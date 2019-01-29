class AddConfirmTokenToCompanies < ActiveRecord::Migration[5.2]
  def change
    add_column :companies, :confirm_token, :string
  end
end
