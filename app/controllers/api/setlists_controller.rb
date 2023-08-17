# frozen_string_literal: true

class Api::SetlistsController < ApplicationController
  def index
    @setlists = Setlist.includes(:songs).all
    render json: @setlists.as_json(methods: %i[songs_count total_duration_time])
  end

  def create
    target_duration_time = Setlist.to_milliseconds(params[:setlistHours], params[:setlistMinutes])
    @setlist = Setlist.new(title: params[:setlistTitle], target_duration_time:)
    songs = Song.find(params[:song_ids])
    if @setlist.save
      songs.each_with_index do |song, i|
        @setlist.song_setlists.create(song:, position: i)
      end
      render json: @setlist
    else
      render json: @setlist.errors, status: :unprocessable_entity
    end
  end
end
