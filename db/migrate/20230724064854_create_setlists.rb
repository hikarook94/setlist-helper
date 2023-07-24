class CreateSetlists < ActiveRecord::Migration[7.0]
  def change
    create_table :setlists do |t|
      t.string :title, null: false
      t.integer :target_duration_time, null: false, default: 0

      t.timestamps
    end
  end
end
