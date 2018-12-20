class BadgeCheckJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
    fonts_of_insp(args[0])
    trailblazer(args[0])

  end
  
  private

  def fonts_of_insp(user_email)
    user_id = User.find_by_email(user_email).id
  
    # .select_all.to_hash will return an empty array if the database query gets nothing
    foi_arr_of_hash = User.connection.select_all("
      SELECT users.id, users.first_name, users.avatar, COUNT(inspiring_entry_id) AS Inspires
      FROM users
      INNER JOIN posts ON users.id = posts.user_id
      INNER JOIN inspires ON inspires.inspiring_entry_type = 'Post' AND posts.id = inspires.inspiring_entry_id
      WHERE users.id = #{user_id}
      GROUP BY users.id
      HAVING COUNT(inspiring_entry_id) > 14
    ").to_hash
    
    # .find returns nil if foi_arr_of_hash is an empty array
    new_foi = foi_arr_of_hash.find do |user_hash|
      user_hash["id"] == user_id
    end

    if new_foi != nil
      user = User.find(new_foi["id"])
      foi_badge = Badge.find_by_name("Font of Inspiration - 15 Inspires from One Post")
      user.badges << foi_badge unless user.badges.include?(foi_badge)
    end

  end
  
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
      tblazer_badge = Badge.find_by_name("Trailblazers - Most Inspiractions this Week")
      
      user.badges << tblazer_badge unless user.badges.include?(tblazer_badge)
    end

  end

end
