class Setlist < ApplicationRecord
  has_many :songs, through: :song_setlists
end
