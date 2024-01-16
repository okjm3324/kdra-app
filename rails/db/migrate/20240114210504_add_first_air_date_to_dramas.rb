class AddFirstAirDateToDramas < ActiveRecord::Migration[7.0]
  def change
    add_column :dramas, :first_air_date, :string
  end
end
