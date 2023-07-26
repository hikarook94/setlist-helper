# frozen_string_literal: true

class SongsController < ApplicationController
  def index
    @songs = Song.order(name: :desc)
  end
end
