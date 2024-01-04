class SpotSerializer < ActiveModel::Serializer
  attributes :id, :name, :latitude, :longitude, :address, :created_at
  belongs_to :user, serializer: UserSerializer

  def created_at
    object.created_at.strftime("%Y/%m/%d")
  end
end
