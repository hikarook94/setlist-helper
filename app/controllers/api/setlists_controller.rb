# frozen_string_literal: true

class Api::SetlistsController < ApplicationController
  def index
    @setlists = current_user.setlists.includes(:songs).order(created_at: :desc).all
    render json: @setlists.as_json(methods: %i[songs_count total_duration_time])
  end

  def show
    set_setlist
    render json: @setlist.as_json(include: :songs, methods: %i[songs_count total_duration_time])
  end

  def create
    @setlist = current_user.setlists.new(setlist_params)

    ActiveRecord::Base.transaction do
      @setlist.save!
      create_song_setlists!(params[:song_ids])
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
    create_song_setlists!(song_ids)
  end

  def create_song_setlists!(song_ids)
    return if song_ids.empty?

    current_time = Time.current
    song_setlists_data = song_ids.map.with_index do |song_id, i|
      {
        song_id:,
        setlist_id: @setlist.id,
        position: i,
        created_at: current_time,
        updated_at: current_time
      }
    end
    SongSetlist.insert_all!(song_setlists_data) # rubocop:disable Rails/SkipsModelValidations
  end

  def set_setlist
    @setlist = current_user.setlists.includes(:songs).find(params[:id])
  end
end
