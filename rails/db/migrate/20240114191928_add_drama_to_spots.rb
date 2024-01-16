class AddDramaToSpots < ActiveRecord::Migration[7.0]
  def change
    add_reference :spots, :drama, null: false, foreign_key: true
  end
end
