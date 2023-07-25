# frozen_string_literal: true

class Song < ApplicationRecord
  has_many :scores
  has_many :song_setlists
  has_many :setlists, through: :song_setlists

  validates :name, presence: true
  validates :name, uniqueness: { scope: :artist, case_sensitive: false }
  validates :artist, presence: true
  validates :duration_time, presence: true
  validates :transposition, numericality: { in: -7..7 }
end
