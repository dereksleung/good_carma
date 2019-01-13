class AddAvatarImgColumnToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :avatar_img, :text
  end
end
