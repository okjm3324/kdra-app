class  Api::V1::DramasController < Api::V1::BaseController
  require 'themoviedb-api'
  Tmdb::Api.key(ENV['TMDB_API_KEY'])
  Tmdb::Api.language("ja")
  def index
  end

  def show
  end

  def create

  end

  def search_drama
    keyword = params[:keyword]
    res = JSON.parse((Tmdb::Search.tv(keyword)).to_json)
    filtered_res = res['table']['results'].select do |item|
      item['table']['origin_country'].include?("KR")
    end.map do |item|
      {
        id: item['table']['id'],
        name: item['table']['name'],
        original_name: item['table']['original_name'],
        poster_path: item['table']['poster_path'],
        first_air_date: item['table']['first_air_date'],
      }
    end
    render json: filtered_res
  end

  def detail_drama
    id = params[:id]
    detail = Tmdb::TV.detail(id)
    render json: detail
  end

  private

  def drama_params
    params.require(:drama).permit(:tmdb_id, :title, :original_title, :image, :total_episodes, :year)
  end

end