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

ActiveRecord::Schema[7.0].define(version: 2023_09_18_075007) do
  create_table "scores", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "song_id", null: false
    t.float "rating", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["rating"], name: "index_scores_on_rating"
    t.index ["song_id"], name: "index_scores_on_song_id"
    t.index ["user_id"], name: "index_scores_on_user_id"
  end

  create_table "setlists", charset: "utf8mb4", force: :cascade do |t|
    t.string "title", null: false
    t.integer "target_duration_time", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_setlists_on_user_id"
  end

  create_table "song_setlists", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "song_id", null: false
    t.bigint "setlist_id", null: false
    t.integer "position", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["setlist_id", "position"], name: "index_song_setlists_on_setlist_id_and_position", unique: true
    t.index ["setlist_id"], name: "index_song_setlists_on_setlist_id"
    t.index ["song_id"], name: "index_song_setlists_on_song_id"
  end

  create_table "songs", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.string "artist", null: false
    t.integer "duration_time", null: false
    t.text "memo"
    t.integer "transposition", limit: 1, default: 0, null: false
    t.string "cover_img"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["name", "artist"], name: "index_songs_on_name_and_artist", unique: true
    t.index ["name"], name: "index_songs_on_name"
    t.index ["user_id"], name: "index_songs_on_user_id"
  end

  create_table "users", charset: "utf8mb4", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name"], name: "index_users_on_name", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "scores", "songs"
  add_foreign_key "scores", "users"
  add_foreign_key "setlists", "users"
  add_foreign_key "song_setlists", "setlists"
  add_foreign_key "song_setlists", "songs"
  add_foreign_key "songs", "users"
end
