class AddParentPostReferencesToPost < ActiveRecord::Migration[5.2]
  def change
    # add_reference :posts, :parent, foreign_key: true, index: true
  end
end
