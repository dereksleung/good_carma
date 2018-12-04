class Api::V1::LeaderboardsController < ApplicationController

  def main
    all_leaderboard_results = {}
    new_posters_sql = <<-SQL
    SELECT users.first_name, users.avatar, MIN(posts.created_at) AS first_post_date
    FROM users
    INNER JOIN posts ON posts.user_id = users.id
    WHERE posts.created_at > now() - interval '1 week' AND NOT EXISTS(
      SELECT users.first_name
      FROM users
      INNER JOIN posts ON posts.user_id = users.id
      WHERE posts.created_at <= now() - interval '1 week'
    )
    GROUP BY users.id
      SQL
    all_leaderboard_results[:new_posters] = ActiveRecord::Base.connection.execute(new_posters_sql)

    two_wk_users_sql = <<-SQL
    SELECT users.first_name, users.avatar, MAX(posts.created_at) AS latest_post_date
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
    SELECT users.first_name, users.avatar, COUNT(parent_post_id) AS Inspiractions
      FROM users
      INNER JOIN posts ON users.id = posts.user_id
      INNER JOIN post_relations ON posts.id = post_relations.parent_post_id
      WHERE post_relations.created_at > now() - interval '1 week'
      GROUP BY users.id
      ORDER BY COUNT(parent_post_id) DESC
    SQL

    arr_miatw = ActiveRecord::Base.connection.execute(miatw_sql)

    render json: arr_miatw

  end

end
