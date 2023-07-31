# frozen_string_literal: true

class Song < ApplicationRecord
  has_many :scores, dependent: :destroy
  has_many :song_setlists, dependent: :destroy
  has_many :setlists, through: :song_setlists

  validates :name, presence: true
  validates :name, uniqueness: { scope: :artist, case_sensitive: false }
  validates :artist, presence: true
  validates :duration_time, presence: true, numericality: { only_integer: true }
  validates :transposition, numericality: { in: -7..7 }

  mount_uploader :cover_img, CoverUploader
end
