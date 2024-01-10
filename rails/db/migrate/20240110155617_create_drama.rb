class CreateDrama < ActiveRecord::Migration[7.0]
  def change
    create_table :dramas do |t|
        t.string :title, comment: "ドラマのタイトル"
        t.string :image, comment:"イメージパス"
        t.timestamps
    end
  end
end
