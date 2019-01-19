class ChangeFollowedColumnToFollowedUser < ActiveRecord::Migration[5.2]
  def change
    rename_column :follows, :followed_id, :followed_users_id
  end
end
