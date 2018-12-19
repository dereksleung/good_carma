class NewSilverUsersJob < ApplicationJob
  queue_as :default

  def perform(*args)


    # Trying to improve performance by limiting the query to just the child posts of the users in the parent_ids_arr of the controller, rather than checking the status of all users. 
    puts "args:", args
    puts "args[0]", args[0]

    args[0].each do |post_id|
      user_id = Post.find(post_id).user.id
      arr_sil_user = User.find_by_sql("
        SELECT users.id, COUNT(parent_post_id) AS Inspiractions
        FROM users
        INNER JOIN posts ON users.id = posts.user_id
        INNER JOIN post_relations ON posts.id = post_relations.parent_post_id
        WHERE users.id = #{user_id}
        GROUP BY users.id
        HAVING COUNT(parent_post_id) > 2
      ")

      if arr_sil_user.present?
        arr_sil_user.each do |user|
          User.find(user.id).update(level:"silver")
        end
      end
    end

  end
end
