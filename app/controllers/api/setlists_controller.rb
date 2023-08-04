# frozen_string_literal: true

class Api::SetlistsController < ApplicationController
  def index
    @setlists = Setlist.includes(:songs).all
    render json: @setlists.as_json(methods: [:songs_count, :total_duration_time])
  end
end
