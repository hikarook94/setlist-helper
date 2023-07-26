# frozen_string_literal: true

module SongsHelper
  def mitunes_seconds(ms)
    s = ms / 1000
    minutes = s / 60
    seconds = s % 60
    "#{minutes} 分 #{seconds} 秒"
  end
end
