class AddUserReferenceToSetlists < ActiveRecord::Migration[7.0]
  def change
    add_reference :setlists, :user, null: false, foreign_key: true
  end
end
