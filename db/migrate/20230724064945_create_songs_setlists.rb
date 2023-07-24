class CreateSongsSetlists < ActiveRecord::Migration[7.0]
  def change
    create_table :songs_setlists do |t|
      t.references :song, null: false, foreign_key: true
      t.references :setlist, null: false, foreign_key: true
      t.integer :position, null: false

      t.timestamps
    end
  end
end
