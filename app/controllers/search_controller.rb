class SearchController < ApplicationController

  def index
    if params[:query].present?
      @tracks = RSpotify::Track.search(params[:query])
    end
  end
end
