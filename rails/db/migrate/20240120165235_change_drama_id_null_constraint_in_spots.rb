class ChangeDramaIdNullConstraintInSpots < ActiveRecord::Migration[7.0]
  def change
    change_column_null :spots, :drama_id, true
  end
end
