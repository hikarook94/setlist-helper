class CreateSetlists < ActiveRecord::Migration[7.0]
  def change
    create_table :setlists do |t|
      t.string :title
      t.integer :target_duration_time

      t.timestamps
    end
  end
end
