class Api::SetlistsController < ApplicationController
  def index
    @setlists = Setlist.all
    render json: @setlists
  end
end
