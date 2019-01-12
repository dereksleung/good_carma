# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_01_12_062301) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "badge_earnings", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "badge_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.daterange "Week"
    t.string "Week_s"
    t.index ["badge_id"], name: "index_badge_earnings_on_badge_id"
    t.index ["user_id"], name: "index_badge_earnings_on_user_id"
  end

  create_table "badges", force: :cascade do |t|
    t.string "name"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.text "body"
    t.bigint "user_id"
    t.bigint "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_comments_on_post_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "logo_url"
    t.string "password_digest"
    t.string "email"
    t.string "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer "priority", default: 0, null: false
    t.integer "attempts", default: 0, null: false
    t.text "handler", null: false
    t.text "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string "locked_by"
    t.string "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority"
  end

  create_table "inspires", force: :cascade do |t|
    t.integer "inspiring_entry_id"
    t.string "inspiring_entry_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.string "color"
    t.index ["inspiring_entry_type", "inspiring_entry_id"], name: "index_inspires_on_inspiring_entry_type_and_inspiring_entry_id"
    t.index ["user_id"], name: "index_inspires_on_user_id"
  end

  create_table "positions", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "company_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_positions_on_company_id"
    t.index ["user_id"], name: "index_positions_on_user_id"
  end

  create_table "post_relations", force: :cascade do |t|
    t.integer "parent_post_id"
    t.integer "child_post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["parent_post_id", "child_post_id"], name: "index_post_relations_on_parent_post_id_and_child_post_id", unique: true
  end

  create_table "posts", force: :cascade do |t|
    t.text "body"
    t.bigint "user_id"
    t.string "picture_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "parent_ids"
    t.string "color"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "sympathies", force: :cascade do |t|
    t.text "body"
    t.string "type"
    t.bigint "user_id"
    t.bigint "post_id"
    t.bigint "comment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comment_id"], name: "index_sympathies_on_comment_id"
    t.index ["post_id"], name: "index_sympathies_on_post_id"
    t.index ["user_id"], name: "index_sympathies_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.string "avatar"
    t.string "level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "confirmed", default: false
    t.string "confirm_token"
  end

  add_foreign_key "badge_earnings", "badges"
  add_foreign_key "badge_earnings", "users"
  add_foreign_key "comments", "posts"
  add_foreign_key "comments", "users"
  add_foreign_key "inspires", "users"
  add_foreign_key "positions", "companies"
  add_foreign_key "positions", "users"
  add_foreign_key "post_relations", "posts", column: "child_post_id"
  add_foreign_key "post_relations", "posts", column: "parent_post_id"
  add_foreign_key "posts", "users"
  add_foreign_key "sympathies", "comments"
  add_foreign_key "sympathies", "posts"
  add_foreign_key "sympathies", "users"
end
