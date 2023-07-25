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

ActiveRecord::Schema[7.0].define(version: 2023_07_25_010924) do
  create_table "scores", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "song_id", null: false
    t.float "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["rating"], name: "index_scores_on_rating"
    t.index ["song_id"], name: "index_scores_on_song_id"
  end

  create_table "setlists", charset: "utf8mb4", force: :cascade do |t|
    t.string "title", null: false
    t.integer "target_duration_time", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["title"], name: "index_setlists_on_title", unique: true
  end

  create_table "song_setlists", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "song_id", null: false
    t.bigint "setlist_id", null: false
    t.integer "position", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["setlist_id"], name: "index_song_setlists_on_setlist_id"
    t.index ["song_id"], name: "index_song_setlists_on_song_id"
  end

  create_table "songs", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.string "artist", null: false
    t.integer "duration_time", null: false
    t.text "memo", null: false
    t.integer "transposition", limit: 1, default: 0, null: false
    t.string "cover_img", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "artist"], name: "index_songs_on_name_and_artist", unique: true
    t.index ["name"], name: "index_songs_on_name"
  end

  add_foreign_key "scores", "songs"
  add_foreign_key "song_setlists", "setlists"
  add_foreign_key "song_setlists", "songs"
end
