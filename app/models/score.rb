# frozen_string_literal: true

class Score < ApplicationRecord
  belongs_to :song
  belongs_to :user

  validates :rating, presence: true
  validates :rating, numericality: { greater_than_or_equal_to: 0 }
end
