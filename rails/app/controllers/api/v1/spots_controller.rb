class Api::V1::SpotsController < Api::V1::BaseController
  def show
    spot = Spot.published.find(params[:id])
    render json: spot
  end
end