class Api::SongsController < ApplicationController
  def random
    @songs = Song.random([])
    render json: @songs.as_json
  end
end
