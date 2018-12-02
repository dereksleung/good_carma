class RemoveParentReferencesFromPosts < ActiveRecord::Migration[5.2]
  def change

    add_column(:posts, :parent_ids, :string)
  end
end
