# frozen_string_literal: true

class Api::SetlistsController < ApplicationController
  def index
    @setlists = Setlist.includes(:songs).order(created_at: :desc).all
    render json: @setlists.as_json(methods: %i[songs_count total_duration_time])
  end

  def show
    set_setlist
    render json: @setlist.as_json(include: :songs, methods: %i[songs_count total_duration_time])
  end

  def create
    @setlist = Setlist.new(setlist_params)
    set_song

    ActiveRecord::Base.transaction do
      @setlist.save!
      create_song_setlists!
    end
    render json: @setlist

  rescue ActiveRecord::RecordInvalid => e
    render json: e.record.errors, status: :unprocessable_entity
  end

  def edit
    set_setlist
    render json: @setlist.as_json(include: :songs, methods: %i[songs_count total_duration_time])
  end

  def update
    set_setlist
    set_song

    ActiveRecord::Base.transaction do
      @setlist.update!(setlist_params)
      update_song_setlists!(params[:song_ids])
    end
    render json: @setlist

  rescue ActiveRecord::RecordInvalid => e
    render json: e.record.errors, status: :unprocessable_entity
  end

  private

  def setlist_params
    params.require(:setlist).permit(:title, :target_duration_time)
  end

  def update_song_setlists!(song_ids)
    @setlist.song_setlists.destroy_all

    @songs.each_with_index do |song, i|
      @setlist.song_setlists.create!(song:, position: i)
    end
  end

  def create_song_setlists!
    @songs.each_with_index do |song, i|
      @setlist.song_setlists.create!(song:, position: i)
    end
  end

  def set_setlist
    @setlist = Setlist.includes(:songs).find(params[:id])
  end

  def set_song
    @songs = Song.find(params[:song_ids])
  end
end
