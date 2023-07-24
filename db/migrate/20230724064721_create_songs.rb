class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.string :name, null: false
      t.string :artist, null: false
      t.integer :duration_time, null: false
      t.text :memo, null: false, default: ''
      t.integer :transposition, null: false
      t.string :cover_img, null: false, default: ''

      t.timestamps
    end
  end
end
