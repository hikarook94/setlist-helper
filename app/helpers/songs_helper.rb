# frozen_string_literal: true

module SongsHelper
  def to_minutes(milli_seconds)
    (milli_seconds / 1000) / 60
  end

  def to_remaining_seconds(milli_seconds)
    (milli_seconds / 1000) % 60
  end
end
