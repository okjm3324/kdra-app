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
end
