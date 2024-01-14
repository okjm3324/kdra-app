class Drama < ApplicationRecord
  has_many :spots, dependent: :destroy
  validates :title, presence: true
end
