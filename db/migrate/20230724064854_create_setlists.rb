class CreateSetlists < ActiveRecord::Migration[7.0]
  def change
    create_table :setlists do |t|
      t.string :title, null: false
      t.integer :target_duration_time, null: false

      t.timestamps
    end
    add_index :setlists, :title, unique: true
  end
end
