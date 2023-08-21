class AddUniqueIndexToSongSetlists < ActiveRecord::Migration[7.0]
  def change
    add_index :song_setlists, [:setlist_id, :position], unique: true
  end
end
