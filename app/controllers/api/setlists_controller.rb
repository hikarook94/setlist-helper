# frozen_string_literal: true

class Api::SetlistsController < ApplicationController
  def index
    @setlists = Setlist.includes(:songs).all
    render json: @setlists.as_json(methods: %i[songs_count total_duration_time])
  end

  def create
    @setlist = Setlist.new(setlist_params)
    @songs = Song.find(params[:song_ids])

    ActiveRecord::Base.transaction do
      @setlist.save!
      create_song_setlists!
    end
    render json: @setlist

  rescue ActiveRecord::RecordInvalid => e
    render json: e.record.errors, status: :unprocessable_entity
  end

  private

  def setlist_params
    params.require(:setlist).permit(:title, :target_duration_time)
  end

  def create_song_setlists!
    @songs.each_with_index do |song, i|
      @setlist.song_setlists.create!(song:, position: i)
    end
  end
end
