class Api::V1::Current::SpotsController < Api::V1::BaseController
  before_action :authenticate_user!

  def create
    unsaved_spot = current_user.spots.unsaved.first || current_user.spots.create!(status: :unsaved)
    render json: unsaved_spot
  end
end
