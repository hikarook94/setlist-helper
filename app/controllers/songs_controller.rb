# frozen_string_literal: true

class SongsController < ApplicationController
  def index
    @songs = Song.order(name: :desc)
  end

  def show
    @song = Song.find(params[:id])
  end
end
