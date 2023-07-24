class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.string :name
      t.string :artist
      t.integer :duration_time
      t.text :memo
      t.integer :transposition
      t.string :cover_img

      t.timestamps
    end
  end
end
