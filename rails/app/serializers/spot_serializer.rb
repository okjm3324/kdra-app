class SpotSerializer < ActiveModel::Serializer
  attributes :id, :name, :latitude, :longitude, :address, :created_at, :status
  belongs_to :user, serializer: UserSerializer

  def status
    object.status_i18n
  end

  def created_at
    object.created_at.strftime("%Y/%m/%d")
  end
end
