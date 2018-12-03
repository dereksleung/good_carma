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

    render json: all_leaderboard_results 
  end

  def silver
    silver_sql = <<-SQL
      SELECT users.first_name, users.avatar, COUNT(parent_post_id) AS Inspiractions
        FROM users
        INNER JOIN posts ON users.id = posts.user_id
        INNER JOIN post_relations ON posts.id = post_relations.parent_post_id
        GROUP BY users.id
        HAVING COUNT(parent_post_id) > 1
    SQL

    arr_silver = ActiveRecord::Base.connection.execute(silver_sql)
    render json: arr_silver
  end

end
