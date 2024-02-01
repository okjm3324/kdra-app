class AddEpisodeToSpots < ActiveRecord::Migration[7.0]
  def change
    add_column :spots, :episode, :integer
  end
end
