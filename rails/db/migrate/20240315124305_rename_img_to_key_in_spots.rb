class RenameImgToKeyInSpots < ActiveRecord::Migration[7.0]
  def change
    rename_column :spots, :image, :key
  end
end
