# frozen_string_literal: true

class Song < ApplicationRecord
  has_many :scores, dependent: :destroy
  has_many :song_setlists, dependent: :destroy
  has_many :setlists, through: :song_setlists

  validates :name, presence: true
  validates :name, uniqueness: { scope: :artist, case_sensitive: false }
  validates :artist, presence: true
  validates :duration_time, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :transposition, numericality: { in: -7..7 }

  mount_uploader :cover_img, CoverUploader

  def self.random(exclude_song_ids, limit=3_600_000)
    random = {
      total_duration_time: 0,
      songs: []
    }
    songs = Song.where.not(id: exclude_song_ids).order('RAND()')
    songs.each do |song|
      temp_duration_time = random[:total_duration_time] + song.duration_time
      if temp_duration_time > limit
        next
      elsif temp_duration_time <= limit
        random[:songs] << song.attributes.slice('id', 'name', 'artist', 'duration_time')
        random[:total_duration_time] = temp_duration_time
      end
    end

    time = Song.milliseconds_to_time(random[:total_duration_time])
    random[:total_hours], random[:total_minutes] = time

    random
  end

  private

  def self.milliseconds_to_time(milliseconds)
    total_seconds = milliseconds / 1000
    hours = (total_seconds / 3600).to_i
    total_seconds %= 3600
    minutes = (total_seconds / 60).to_i

    return hours, minutes
  end
end
