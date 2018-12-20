class BadgeCheckJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
    trailblazer(args)

  end
  
  private
  
  def trailblazer(user_email)
    user_id = User.find_by_email(user_email).id
  
    tblazers_arr_of_hash = User.connection.select_all("
      SELECT users.first_name, users.avatar, users.id, COUNT(parent_post_id) AS Inspiractions
      FROM users
      INNER JOIN posts ON users.id = posts.user_id
      INNER JOIN post_relations ON posts.id = post_relations.parent_post_id
      WHERE post_relations.created_at > now() - interval '1 week'
      GROUP BY users.id
      ORDER BY COUNT(parent_post_id) DESC
      LIMIT 5
    ").to_hash
    
    new_tblazer = tblazers_arr_of_hash.find do |user_hash|
      user_hash["id"] == user_id
    end

    if new_tblazer != nil
      user = User.find(new_tblazer["id"])
      user.badges << Badge.find_by_name("Trailblazers - Most Inspiractions this Week")
    end

  end

end
