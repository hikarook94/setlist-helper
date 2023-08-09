class Api::SongsController < ApplicationController
  def random
    p params
    @songs = Song.random([])
    render json: @songs.as_json
  end
end
