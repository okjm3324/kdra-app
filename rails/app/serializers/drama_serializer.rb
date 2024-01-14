class DramaSerializer < ActiveModel::Serializer
  attributes :id
  attributes :tmdb_id, :title, :original_title, :total_episodes, :first_air_date, poster_path, :created_at, :episode_number, :number_of_seasons
end
