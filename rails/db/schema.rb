# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_03_15_124305) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "dramas", force: :cascade do |t|
    t.integer "tmdb_id", comment: "TMDB上のタイトルのid"
    t.string "title", comment: "邦題"
    t.string "original_title", comment: "原題"
    t.integer "episode_number", comment: "エピソードの総数"
    t.integer "season_number", comment: "シーズンの総数"
    t.string "poster_path", comment: "イメージパス"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_air_date"
  end

  create_table "spots", force: :cascade do |t|
    t.float "latitude", comment: "緯度"
    t.float "longitude", comment: "経度"
    t.string "name", comment: "名前"
    t.string "key", comment: "イメージパス"
    t.string "address", comment: "住所"
    t.integer "status", comment: "ステータス（10:未保存, 20:下書き, 30:公開中）"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "drama_id"
    t.integer "episode"
    t.index ["drama_id"], name: "index_spots_on_drama_id"
    t.index ["user_id"], name: "index_spots_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "spots", "dramas"
  add_foreign_key "spots", "users"
end
