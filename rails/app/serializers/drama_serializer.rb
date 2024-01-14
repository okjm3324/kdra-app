class DramaSerializer < ActiveModel::Serializer
  attributes :id
  attributes :id, :title, :original_title, :total_episodes, :first_air_date, poster_path, :created_at
end
