class DropAndRecreateInspiresTableSoNoPolymorphicKeyAndPrimaryKeyConflicts < ActiveRecord::Migration[5.2]
  def change
    drop_table(:inspires)

    create_table :inspires do |t|

      t.integer :inspiring_entry_id
      t.string  :inspiring_entry_type
      t.timestamps
    end
 
    add_index :inspires,[:inspiring_entry_type, :inspiring_entry_id]
    
  end
end
