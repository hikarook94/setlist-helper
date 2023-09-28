# frozen_string_literal: true

class Song < ApplicationRecord
  has_many :scores, dependent: :destroy
  has_many :song_setlists, dependent: :destroy
  has_many :setlists, through: :song_setlists

  belongs_to :user

  validates :name, presence: true
  validates :name, uniqueness: { scope: :artist, case_sensitive: false }
  validates :artist, presence: true
  validates :duration_time, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :transposition, numericality: { in: -7..7 }

  mount_uploader :cover_img, CoverUploader

  # 3_600_000 ms == 1 hour
  def self.random(exclude_song_ids, total_duration_time = 0, limit = 3_600_000)
    selected_songs = Song.select(:id, :name, :artist, :duration_time).where(id: exclude_song_ids)
    selected_songs = selected_songs.to_a
    songs = Song.where.not(id: exclude_song_ids).order('RAND()')
    songs.each do |song|
      temp_duration_time = total_duration_time + song.duration_time
      if temp_duration_time > limit
        next
      elsif temp_duration_time <= limit
        selected_songs << song.attributes.slice('id', 'name', 'artist', 'duration_time')
        total_duration_time = temp_duration_time
      end
    end

    { songs: selected_songs, total_duration_time: }
  end

  def self.milliseconds_to_time(milliseconds)
    total_seconds = milliseconds / 1000
    hours = (total_seconds / 3600).to_i
    total_seconds %= 3600
    minutes = (total_seconds / 60).to_i

    [hours, minutes]
  end

  def self.format_track(track)
    {
      name: track.name,
      artist: track.artists.first.name,
      minutes: track.duration_ms / 60_000, # duration_msはミリ秒単位なので、分に変換
      seconds: (track.duration_ms / 1000) % 60, # 残りの秒数を取得
      memo: "", 
      cover_img: track.album.images.first["url"], # アルバムのカバー画像URL
      transposition: 0 
    }
  end
end
