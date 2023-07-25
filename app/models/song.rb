class Song < ApplicationRecord
  has_many :scores
  has_many :setlists, through: :song_setlists
end
