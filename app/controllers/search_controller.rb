# frozen_string_literal: true

class SearchController < ApplicationController
  def index
    return if params[:query].blank?

    @tracks = RSpotify::Track.search(params[:query])
  end
end
