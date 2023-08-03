class Api::SetlistsController < ApplicationController
  def index
    @setlists = Setlist.includes(:songs).all
    render json: @setlists.as_json(include: :songs)
  end
end
