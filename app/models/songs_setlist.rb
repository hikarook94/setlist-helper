class SongsSetlist < ApplicationRecord
  belongs_to :song
  belongs_to :setlist
end
