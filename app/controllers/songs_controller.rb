# frozen_string_literal: true

class SongsController < ApplicationController
  def index
    @sort_by = params[:sort_by]
    @artist = params[:filter_by]
    if @sort_by == 'artists'
      @artists = Song.distinct.pluck(:artist).sort
    else
      @songs = params[:filter_by].present? ? Song.where(artist: params[:filter_by]) : Song.order(name: :asc)
    end
  end

  def show
    @song = Song.find(params[:id])
  end

  def new
    @song = Song.new
  end

  def create
    processed_params = song_params
    processed_params[:duration_time] = to_ms(processed_params.delete(:minutes), processed_params.delete(:seconds))
    @song = Song.new(processed_params)

    if @song.save
      redirect_to @song
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def song_params
    params.require(:song).permit(:name, :artist, :minutes, :seconds, :memo, :cover_img, :transposition)
  end

  def to_ms(minutes, seconds)
    total_seconds = seconds.to_i + minutes.to_i * 60
    total_seconds * 1000
  end
end
