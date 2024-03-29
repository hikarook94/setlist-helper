class CreateSongSetlists < ActiveRecord::Migration[7.0]
  def change
    create_table :song_setlists do |t|
      t.references :song, null: false, foreign_key: true
      t.references :setlist, null: false, foreign_key: true
      t.integer :position, null: false

      t.timestamps
    end
    add_index :song_setlists, [:setlist_id, :position], unique: true
  end
end
