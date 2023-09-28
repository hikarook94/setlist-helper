# frozen_string_literal: true

class SearchController < ApplicationController
  def index
    return if params[:query].blank?

    raw_tracks = RSpotify::Track.search(params[:query])
    @tracks = raw_tracks.map { |track| Song.format_track(track) }
  end
end
