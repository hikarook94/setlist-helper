# frozen_string_literal: true

class SongsController < ApplicationController
  before_action :authenticate_user!

  def index
    @sort_by = params[:sort_by]
    @artist = params[:filter_by]
    if @sort_by == 'artists'
      @songs = current_user.songs
      @artists = current_user.songs.distinct.pluck(:artist).sort
    else
      @songs = params[:filter_by].present? ? current_user.songs.where(artist: params[:filter_by]) : current_user.songs.order(name: :asc)
    end
  end

  def show
    @song = current_user.songs.find(params[:id])
  end

  def new
    @song = current_user.songs.new
  end

  def create
    processed_params = song_params
    processed_params[:duration_time] = to_ms(processed_params.delete(:minutes), processed_params.delete(:seconds))
    @song = current_user.songs.build(processed_params)

    if @song.save
      redirect_to @song
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @song = current_user.songs.find(params[:id])
  end

  def update
    @song = current_user.songs.find(params[:id])
    processed_params = song_params
    processed_params[:duration_time] = to_ms(processed_params.delete(:minutes), processed_params.delete(:seconds))

    if @song.update(processed_params)
      redirect_to @song
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    song = current_user.songs.find(params[:id])
    flash[:alert] = '削除に失敗しました。' unless song.destroy
    redirect_to songs_path(query_params(URI(request.referer)))
  end

  private

  def song_params
    params.require(:song).permit(:name, :artist, :minutes, :seconds, :memo, :cover_img, :transposition)
  end

  def to_ms(minutes, seconds)
    total_seconds = seconds.to_i + minutes.to_i * 60
    total_seconds * 1000
  end

  def query_params(url)
    return {} if url.query.nil?

    query_hash = CGI.parse(url.query)
    query_hash.transform_values(&:first)
  end
end
