# frozen_string_literal: true

class Setlist < ApplicationRecord
  has_many :song_setlists, dependent: :destroy
  has_many :songs, through: :song_setlists

  validates :title, presence: true
  validates :target_duration_time, presence: true
  validates :target_duration_time, numericality: { only_integer: true }

  delegate :count, to: :songs, prefix: true

  def total_duration_time
    songs.sum(:duration_time)
  end

  def self.to_milliseconds(hours, minutes=0)
    (hours.to_i * 60 + minutes.to_i) * 60 * 1000
  end
end
