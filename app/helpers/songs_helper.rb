# frozen_string_literal: true

module SongsHelper
  def mitunes_seconds(milli_seconds)
    seconds = milli_seconds / 1000
    "#{seconds / 60} 分 #{seconds % 60} 秒"
  end
end
