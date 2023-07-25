class Setlist < ApplicationRecord
  has_many :song_setlists
  has_many :songs, through: :song_setlists

  validates :title, presence: true
  validates :target_duration_time, presence: true
  validates :target_duration_time, numericality: { only_integer: true }
end
