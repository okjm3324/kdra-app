class CreateDrama < ActiveRecord::Migration[7.0]
  def change
    create_table :dramas do |t|
        t.integer :tmdb_id, comment: "TMDB上のタイトルのid"
        t.string :title, comment: "邦題"
        t.string :original_title, comment: "原題"
        t.integer :episode_number, comment: "エピソードの総数"
        t.integer :season_number, comment: "シーズンの総数"
        t.string :poster_path, comment:"イメージパス"
        t.timestamps
    end
  end
end
