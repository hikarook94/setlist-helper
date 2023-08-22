# frozen_string_literal: true

class Api::SetlistsController < ApplicationController
  def index
    @setlists = Setlist.includes(:songs).all
    render json: @setlists.as_json(methods: %i[songs_count total_duration_time])
  end

  def show
    @setlist = Setlist.includes(:songs).find(params[:id])
    render json: @setlist.as_json(include: :songs, methods: %i[songs_count total_duration_time])
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

  def edit
    @setlist = Setlist.includes(:songs).find(params[:id])
    render json: @setlist.as_json(include: :songs, methods: %i[songs_count total_duration_time])
  end

  def update
    @setlist = Setlist.includes(:songs).find(params[:id])

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
    @setlist.song_setlists.where.not(song_id: song_ids).destroy_all

    song_ids.each_with_index do |song_id, i|
      song_setlist = @setlist.song_setlists.find_or_initialize_by(song_id:)
      song_setlist.update!(song_id:, position: i)
    end
  end

  def create_song_setlists!
    @songs.each_with_index do |song, i|
      @setlist.song_setlists.create!(song:, position: i)
    end
  end
end
