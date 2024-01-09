class Api::V1::Current::SpotsController < Api::V1::BaseController
  before_action :authenticate_user!
  def index
    spots = current_user.spots.not_unsaved.order(created_at: :desc)
    render json: spots
  end

  def show
    spot = current_user.spots.find(params[:id])
    render json: spot
  end

  def create
    unsaved_spot = current_user.spots.unsaved.first || current_user.spots.create!(status: :unsaved)
    render json: unsaved_spot
  end

  def update
    spot = current_user.spots.find(params[:id])
    spot.update!(spot_params)
    render json: spot
  end

  private

    def spot_params
      params.require(:spot).permit(:name, :latitude, :longitude, :address, :status)
    end
end
