# frozen_string_literal: true

class SongsController < ApplicationController
  def index
    @sort_by = params[:sort_by]
    @artist = params[:filter_by]
    if @sort_by == 'artists'
      @artists = Song.distinct.pluck(:artist).sort
    else
      @songs = params[:filter_by] ? Song.where(artist: params[:filter_by]) : Song.order(name: :asc)
    end
  end

  def show
    @song = Song.find(params[:id])
  end
end
