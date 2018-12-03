class MakeInspiresPolymorphic < ActiveRecord::Migration[5.2]
  def change
    # remove_reference(:inspires, :posts, index: true, foreign_key: true)
    # remove_reference(:inspires, :comments, index: true, foreign_key: true)

    # add_column(:inspires, :inspiring_entry_id, :integer)
    # add_column(:inspires, :inspiring_entry_type, :string)

    # add_index(:inspires, [:inspiring_entry_type, :inspiring_entry_id])
  end
end
