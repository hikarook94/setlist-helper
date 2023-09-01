class CreateScores < ActiveRecord::Migration[7.0]
  def change
    create_table :scores do |t|
      t.references :song, null: false, foreign_key: true
      t.float :rating, null: false, index: true

      t.timestamps
    end
  end
end
