# frozen_string_literal: true

class Setlist < ApplicationRecord
  has_many :song_setlists, dependent: :destroy
  has_many :songs, through: :song_setlists

  validates :title, presence: true
  validates :target_duration_time, presence: true
  validates :target_duration_time, numericality: { only_integer: true }
end
