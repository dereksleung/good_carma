class ChangeFollowedUsersIdToFollowedUserId < ActiveRecord::Migration[5.2]
  def change
    rename_column :follows, :followed_users_id, :followed_user_id
  end
end
