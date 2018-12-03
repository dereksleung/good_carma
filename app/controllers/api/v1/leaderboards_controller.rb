class Api::V1::LeaderboardsController < ApplicationController

  def main
    all_leaderboard_results = {}
    sql = <<-SQL
    SELECT users.first_name, users.screenname, users.avatar
      FROM users
      INNER JOIN posts ON posts.user_id = users.id
      WHERE posts.created_at > now() - interval '1 week' AND NOT EXISTS(
        SELECT users.first_name
        FROM users
        INNER JOIN posts ON posts.user_id = users.id
        WHERE posts.created_at <= now() - interval '1 week'
      )
      GROUP BY users.first_name
      ORDER BY posts.created_at DESC
      SQL
    all_leaderboard_results[:new_posters] = ActiveRecord::Base.connection.execute(sql)

    render json: all_leaderboard_results 
  end

end
