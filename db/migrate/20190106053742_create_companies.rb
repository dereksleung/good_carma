class CreateCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :companies do |t|
      t.string :name
      t.text :description
      t.string :logo_url
      t.string :password_digest
      t.string :email
      t.string :username

      t.timestamps
    end
  end
end
