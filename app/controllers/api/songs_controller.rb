# frozen_string_literal: true

class Api::SongsController < ApplicationController
  def index
    @songs = Song.select(:id, :name, :artist, :duration_time)
    render json: @songs
  end

  def random
    setlist_limit = Setlist.to_milliseconds(params[:setlistHours], params[:setlistMinutes])
    @songs = Song.random(params[:song_ids], params[:total_duration_time], setlist_limit)
    render json: @songs.as_json
  end
end
