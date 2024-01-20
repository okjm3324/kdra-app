class  Api::V1::ImagesController < Api::V1::BaseController
  before_action  :authenticate_user!, only: [:create]

  # GET /images/1
  # GET /images/1.json
  def show
    @key = params[:id]
    @signed_url = Image.signed_url(@key, :get_object)
    render json: { key: @key, signed_url: @signed_url }, status: :ok
  end

  # POST /images
  # POST /images.json
  def create
    @key = SecureRandom.uuid
    @signed_url = Image.signed_url(@key, :put_object)
    render json: { key: @key, signed_url: @signed_url }, status: :ok
  end
end