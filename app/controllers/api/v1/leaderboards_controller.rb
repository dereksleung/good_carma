class Api::V1::LeaderboardsController < ApplicationController

  def overachievers_this_week
    oa_sql = <<-SQL
      SELECT users.first_name || ' ' || users.last_name AS full_name, users.avatar, users.slug, COUNT(badge_earnings.id) AS Badges
      FROM users
      INNER JOIN badge_earnings ON users.id = badge_earnings.user_id
      INNER JOIN badges ON badge_earnings.badge_id = badges.id 
      WHERE badge_earnings.created_at > now() - interval '1 week'
      GROUP BY users.slug, full_name, users.avatar
      ORDER BY COUNT(badge_earnings.id) DESC
      LIMIT 5
    SQL

    records_array = ActiveRecord::Base.connection.exec_query(oa_sql)
    titles_array = []
    if records_array.present?
      titles_array = records_array[0].to_hash.keys
      titles_array.delete_if {|elem| elem == "slug" || elem == "avatar" || elem == "avatar_image" }
      # return titles_array
    end
    attach_user_avatar(records_array)
    oa_badge = Badge.find_by_name("Overachievers")

    render json: {titles_array: titles_array, records_array: records_array, image: get_badge_image_url(oa_badge)}
  end

  def muses_this_week
    m_sql = <<-SQL
      SELECT users.first_name || ' ' || users.last_name AS full_name, users.avatar, users.slug, COUNT(inspires.id) AS Inspires
      FROM users
      INNER JOIN inspires ON users.id = inspires.user_id
      INNER JOIN posts ON (posts.id = inspires.inspiring_entry_id AND inspiring_entry_type = 'Post')
      WHERE inspires.created_at > now() - interval '1 week'
      GROUP BY users.slug, full_name, users.avatar
      ORDER BY COUNT(inspires.id) DESC
      LIMIT 5
    SQL

    records_array = ActiveRecord::Base.connection.exec_query(m_sql)
    
    titles_array = []
    if records_array.present?
      titles_array = records_array[0].to_hash.keys
      titles_array.delete_if {|elem| elem == "slug" || elem == "avatar" || elem == "avatar_image" }
      # return titles_array
    end
    attach_user_avatar(records_array)
    records_array.each {|user| 
      user
    }
    m_badge = Badge.find_by_name("Muse - Most Inspires this Week")
    
    render json: {titles_array: titles_array, records_array: records_array, image: get_badge_image_url(m_badge)}
  end

  def foi_this_week
    foi_sql = <<-SQL
      SELECT users.slug, users.first_name || ' ' || users.last_name AS full_name, users.avatar, COUNT(inspiring_entry_id) AS Inspires
      FROM users
      INNER JOIN posts ON users.id = posts.user_id
      INNER JOIN inspires ON inspires.inspiring_entry_type = 'Post' AND posts.id = inspires.inspiring_entry_id
      WHERE inspires.created_at > now() - interval '12 weeks'
      GROUP BY users.slug, full_name, users.avatar
      HAVING COUNT(inspiring_entry_id) > 14
    SQL

    records_array = ActiveRecord::Base.connection.exec_query(foi_sql)
    titles_array = []
    if records_array.present?
      titles_array = records_array[0].to_hash.keys
      titles_array.delete_if {|elem| elem == "slug" || elem == "avatar" || elem == "avatar_image" }
      # return titles_array
    end
    attach_user_avatar(records_array)
    foi_badge = Badge.find_by_name("Font of Inspiration - 15 Inspires from One Post")
    
    render json: {titles_array: titles_array, records_array: records_array, image: get_badge_image_url(foi_badge)}
  end

  def wild_growths_this_week
    wg_sql = <<-SQL
      SELECT users.first_name || ' ' || users.last_name AS full_name, users.avatar, users.slug, COUNT(posts.id) AS Posts
      FROM users
      INNER JOIN posts ON users.id = posts.user_id
      WHERE posts.created_at > now() - interval '1 week'
      GROUP BY users.id
      HAVING COUNT(posts.id) > 3 * (
        SELECT COUNT(posts.id)
        FROM posts
        INNER JOIN users ON posts.user_id = users.id
        WHERE posts.created_at BETWEEN (now() - interval '2 weeks') AND (now() - interval '1 week')
      )
      ORDER BY COUNT(posts.id) DESC
      LIMIT 5
    SQL

    records_array = ActiveRecord::Base.connection.exec_query(wg_sql)
    titles_array = []
    if records_array.present?
      titles_array = records_array[0].to_hash.keys
      titles_array.delete_if {|elem| elem == "slug" || elem == "avatar" || elem == "avatar_image" }
      # return titles_array
    end
    attach_user_avatar(records_array)
    wg_badge = Badge.find_by_name("Font of Inspiration - 15 Inspires from One Post")
    
    render json: {titles_array: titles_array, records_array: records_array, image: get_badge_image_url(wg_badge)}
  end

  def main
    all_leaderboard_results = {}
    new_posters_sql = <<-SQL
      SELECT users.first_name || ' ' || users.last_name AS full_name, users.slug, users.avatar, DATE_TRUNC('days', MIN(AGE(now(),posts.created_at))) AS first_post_date
      FROM users
      INNER JOIN posts ON posts.user_id = users.id
      WHERE (posts.created_at > now() - interval '1 week') AND NOT EXISTS(
        SELECT 1
        FROM posts p
        WHERE p.user_id = users.id
        AND posts.created_at <= now() - interval '1 week'
      )
      GROUP BY users.id
    SQL

    arr_new_posters = ActiveRecord::Base.connection.execute(new_posters_sql)

    all_leaderboard_results[:new_posters] = arr_new_posters

    two_wk_users_sql = <<-SQL
      SELECT users.first_name  || ' ' || users.last_name AS full_name, users.slug, users.avatar, DATE_TRUNC('days', MAX(AGE(now(),posts.created_at))) AS latest_post_date
        FROM users
        INNER JOIN posts ON posts.user_id = users.id
        WHERE posts.created_at > now() - interval '2 weeks' AND NOT EXISTS(
          SELECT 1
          FROM posts p
          WHERE p.user_id = users.id 
          AND posts.created_at <= now() - interval '2 weeks'
        )
        GROUP BY users.id
        HAVING COUNT(posts.user_id) > 1
    SQL
    
    all_leaderboard_results[:arr_two_wk] = ActiveRecord::Base.connection.execute(two_wk_users_sql)

    render json: all_leaderboard_results 
  end

  def silver
    silver_sql = <<-SQL
      SELECT users.first_name, users.avatar, users.id, COUNT(parent_post_id) AS Inspiractions
        FROM users
        INNER JOIN posts ON users.id = posts.user_id
        INNER JOIN post_relations ON posts.id = post_relations.parent_post_id
        GROUP BY users.id
        HAVING COUNT(parent_post_id) > 1
    SQL

    arr_silver = ActiveRecord::Base.connection.execute(silver_sql)

    arr_silver.each do |user|
      sil_user = User.find(user["id"])
      sil_user.update(level:"silver")
    end

    render json: arr_silver
  end

  def gold
    gold_sql = <<-SQL
      SELECT users.first_name, users.avatar, COUNT(parent_post_id) AS Inspiractions
        FROM users
        INNER JOIN posts ON users.id = posts.user_id
        INNER JOIN post_relations ON posts.id = post_relations.parent_post_id
        GROUP BY users.id
        HAVING COUNT(parent_post_id) > 7
    SQL

  arr_gold = ActiveRecord::Base.connection.execute(gold_sql)

  arr_gold.each do |user|
    gold_user = User.find(user["id"])
    gold_user.update(level:"gold")
    end

  render json: arr_gold
  end

  def two_wk_users

    two_wk_users_sql = <<-SQL
      SELECT users.first_name, users.avatar, MIN(posts.created_at) AS first_post_date
        FROM users
        INNER JOIN posts ON posts.user_id = users.id
        WHERE posts.created_at > now() - interval '2 weeks' AND NOT EXISTS(
          SELECT users.first_name
          FROM users
          INNER JOIN posts ON posts.user_id = users.id
          WHERE posts.created_at <= now() - interval '2 weeks'
        )
        GROUP BY users.id
        HAVING COUNT(posts.user_id) > 1
    SQL
    
    arr_two_wk = ActiveRecord::Base.connection.execute(two_wk_users_sql)

    render json: arr_two_wk
  end

  def most_i_actions_this_week
    miatw_sql = <<-SQL
    SELECT users.slug, users.first_name || ' ' || users.last_name AS full_name, users.avatar, COUNT(parent_post_id) AS Inspiractions
      FROM users
      INNER JOIN posts ON users.id = posts.user_id
      INNER JOIN post_relations ON posts.id = post_relations.parent_post_id
      WHERE post_relations.created_at > now() - interval '1 week'
      GROUP BY users.slug, full_name, users.avatar
      ORDER BY COUNT(parent_post_id) DESC
    SQL

    records_array = ActiveRecord::Base.connection.exec_query(miatw_sql)
    titles_array = []
    if records_array.present?
      titles_array = records_array[0].to_hash.keys
      titles_array.delete_if {|elem| elem == "slug" || elem == "avatar" || elem == "avatar_image" }
      # return titles_array
    end
    attach_user_avatar(records_array)
    tb_badge = Badge.find_by_name("Trailblazers - Most Inspiractions this Week")
    
    render json: {titles_array: titles_array, records_array: records_array, image: get_badge_image_url(tb_badge)}

  end

  private

  def get_badge_image_url(badge)
    if Rails.env.development?
      if badge.image.attached?
        return "http://localhost:3000#{rails_blob_url(badge.image, only_path: true)}" 
      else
        ""
      end
    else 
      if badge.image.attached?
        rails_blob_url(badge.image, only_path: true) 
      else 
        ""
      end
    end
  end

  def attach_user_avatar(records_array)
    records_array.each {|user|
      user_record = User.find_by_slug(user["slug"]) 
      
      if Rails.env.development?
        if user_record.avatar_image.attached?
          user["avatar_image"] = "http://localhost:3000#{rails_blob_url(user_record.avatar_image, only_path: true)}" 
        end
      else 
        user["avatar_image"] = rails_blob_url(user_record.avatar_image, only_path: true) if user_record.avatar_image.attached?
      end
    }
  end

  def set_titles_array(titles_array, records_array)
    
    if records_array.present?
      titles_array = records_array[0].to_hash.keys
      titles_array.delete_if {|elem| elem == "slug" || elem == "avatar" || elem == "avatar_image" }
      # return titles_array
    end
  end
end
