class Api::V1::SpotsController < Api::V1::BaseController
  include Pagination

  def show
    spot = Spot.published.find(params[:id])
    render json: spot
  end

  def index
    spots = Spot.published.order(created_at: :desc).page(params[:page] || 1).per(10).includes(:user)
    render json: spots, meta: pagination(spots), adapter: :json
  end

  def create
    unsaved_spot = current_user.spots.unsaved.first || current_user.spots.create!(status: :unsaved)
    render json: unsaved_spot
  end

  def update
    binding.pry
    spot = current_user.spots.find(params[:id])
    spot.update!(spot_params)
  end

  private

  def spot_params
    binding.pry
    params.require(:spot).permit(:name, :latitude, :longitude, :address, :status, :user_id, :drama_id, :episode, :key)
  end
end
