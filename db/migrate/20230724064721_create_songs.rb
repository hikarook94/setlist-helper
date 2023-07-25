class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.string :name, null: false
      t.string :artist, null: false
      t.integer :duration_time, null: false
      t.text :memo, null: false
      t.integer :transposition, null: false, default: 0, limit: 1
      t.string :cover_img, null: false, default: ''

      t.timestamps
    end
    add_index :songs, :name
    add_index :songs, [:name, :artist], unique: true
  end
end
