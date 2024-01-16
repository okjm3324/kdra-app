class DramaSerializer < ActiveModel::Serializer
  attributes :id
  attributes :tmdb_id, :title, :original_title,  :first_air_date, :poster_path, :created_at, :episode_number, :season_number
end
