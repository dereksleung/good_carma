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

ActiveRecord::Schema.define(version: 2018_12_02_192853) do

  create_table "comments", force: :cascade do |t|
    t.text "body"
    t.integer "user_id"
    t.integer "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_comments_on_post_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "inspiractions", force: :cascade do |t|
    t.text "body"
    t.string "type"
    t.integer "user_id"
    t.integer "post_id"
    t.integer "comment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comment_id"], name: "index_inspiractions_on_comment_id"
    t.index ["post_id"], name: "index_inspiractions_on_post_id"
    t.index ["user_id"], name: "index_inspiractions_on_user_id"
  end

  create_table "inspires", force: :cascade do |t|
    t.integer "inspiring_entry_id"
    t.string "inspiring_entry_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["inspiring_entry_type", "inspiring_entry_id"], name: "index_inspires_on_inspiring_entry_type_and_inspiring_entry_id"
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
    t.integer "user_id"
    t.string "picture_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "parent_id"
    t.string "parent_ids"
    t.index ["parent_id"], name: "index_posts_on_parent_id"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "sympathies", force: :cascade do |t|
    t.text "body"
    t.string "type"
    t.integer "user_id"
    t.integer "post_id"
    t.integer "comment_id"
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
  end

end
