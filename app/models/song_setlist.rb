class SongSetlist < ApplicationRecord
  belongs_to :song
  belongs_to :setlist

  validates :position, presence: true
  validates :position, numericality: { greater_than_or_equal_to: 0 }
end
