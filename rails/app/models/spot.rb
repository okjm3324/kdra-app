class Spot < ApplicationRecord
  belongs_to :user
  enum : status, { unsaved: 10, draft: 20, published: 30 }, _prefix: true
  validates :latitude, :longitude, :name, presence: true, if: :published?
  validate :verify_only_one_unsaved_status_is_allowed

private
  def verify_only_one_unsaved_status_is_allowed
    if unsaved? && user.spots.unsaved.present?
      raise StandardError, "未保存のスポットは複数保有できません"
    end
  end
end
