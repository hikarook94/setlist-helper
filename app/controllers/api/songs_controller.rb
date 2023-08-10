class Api::SongsController < ApplicationController
  def random
    @songs = Song.random(params[:song_ids], Setlist.to_milliseconds(params[:setlistHours], params[:setlistMinutes]))
    render json: @songs.as_json
  end
end
