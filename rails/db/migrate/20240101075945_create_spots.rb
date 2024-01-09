class CreateSpots < ActiveRecord::Migration[7.0]
  def change
    create_table :spots do |t|
          t.float :latitude, comment: "緯度"
          t.float :longitude, comment: "経度"
          t.string :name, comment:"名前"
          t.string :image, comment:"イメージパス"
          t.string :address, comment: "住所"
          t.integer :status, comment: "ステータス（10:未保存, 20:下書き, 30:公開中）"
          t.references :user, null: false, foreign_key: true
          t.timestamps
    end
  end
end
