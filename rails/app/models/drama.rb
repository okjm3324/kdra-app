class Spot < ApplicationRecord
  has_many :spots, dependent: :destroy
  validates :name, presence: true
end
