class  Api::V1::DramasController < Api::V1::BaseController
  require 'themoviedb-api'
  Tmdb::Api.key(ENV['TMDB_API_KEY'])
  Tmdb::Api.language("ja")
  def index
  end

  def show
  end

  def create
    drama = Drama.new(drama_params)
    if drama.save
      render json: drama, status: :create
    else
      render json: drama.error, status: :unprocessable_entity
    end
  end


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
        episode_number: item['table']['episode_number']
      }
    end
    render json: filtered_res
  end

  def detail_drama
    id = params[:id]
    data = JSON.parse(Tmdb::TV.detail(id).to_json)
    res = {
      title: data['table']['name'],
      original_title: data['table']['original_name'],
      tmdb_id: data['table']['id'],
      poster_path: data['table']['poster_path'],
      first_air_date: data['table']['first_air_date'],
      episode_number: data['table']['number_of_episodes'],
      season_number: data['table']['number_of_seasons']
    }
    render json: res
  end

  private

  def drama_params
    params.require(:drama).permit(:tmdb_id, :title, :original_title, :poster_path, :episode_number, :season_number :first_air_date)
  end

end