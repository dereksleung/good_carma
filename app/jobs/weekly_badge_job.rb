class WeeklyBadgeJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
    trailblazer
    overachievers
    muses
    # thought_provokers(args[0])
    # wild_growths(args[0])

    WeeklyBadgeJob.set(wait: 1.week).perform_later
    
  end

  def trailblazer

    tblazers_arr_of_hash = User.find_by_sql("
      SELECT users.first_name, users.avatar, users.id, COUNT(parent_post_id) AS Inspiractions
      FROM users
      INNER JOIN posts ON users.id = posts.user_id
      INNER JOIN post_relations ON posts.id = post_relations.parent_post_id
      WHERE post_relations.created_at > now() - interval '1 week'
      GROUP BY users.id
      ORDER BY COUNT(parent_post_id) DESC
      LIMIT 5
    ")
    tblazers_arr_of_hash.each do |tb_user|
      tblazer_badge = Badge.find_by_name("Trailblazers - Most Inspiractions this Week")
      badge_earning = BadgeEarning.new(
        Week: (Time.zone.today - 1.week)..Time.zone.today,
        Week_s: "#{(Time.zone.today - 1.week).to_formatted_s(:rfc822)} - #{Time.zone.today.to_formatted_s(:rfc822)}"
      )
      badge_earning.user = tb_user
      badge_earning.badge = tblazer_badge

      # Save the badge only if the user hasn't earned the same badge this week yet.
      if tb_user.badge_earnings.any?{|b_e| (b_e.Week === ((Time.zone.today - 1.week)..Time.zone.today)) && (b_e.badge_id = 4)} 
      else
        badge_earning.save
        add_points_to_user(tb_user, tblazer_badge)
      end

  
    end
  end

  def overachievers
    oachvrs_arr_of_hash = User.find_by_sql("
      SELECT users.first_name || ' ' || users.last_name, users.avatar, users.id, COUNT(badge_earnings.id) AS Badges
      FROM users
      INNER JOIN badge_earnings ON users.id = badge_earnings.user_id
      INNER JOIN badges ON badge_earnings.badge_id = badges.id 
      WHERE badge_earnings.created_at > now() - interval '1 week'
      GROUP BY users.id
      ORDER BY COUNT(badge_earnings.id) DESC
      LIMIT 5
    ")
    
    
    oachvrs_arr_of_hash.each do |oa_user|
      oa_badge = Badge.find_by_name("Overachievers")
      badge_earning = BadgeEarning.new(
        Week: (Time.zone.today - 1.week)..Time.zone.today,
        Week_s: "#{(Time.zone.today - 1.week).to_formatted_s(:rfc822)} - #{Time.zone.today.to_formatted_s(:rfc822)}"
        )
        badge_earning.user = oa_user
        badge_earning.badge = oa_badge
        
      # Save the badge only if the user hasn't earned the same badge this week yet.
      if oa_user.badge_earnings.any?{|b_e| (b_e.Week === ((Time.zone.today - 1.week)..Time.zone.today)) && (b_e.badge_id = 5)} 
      else
        badge_earning.save
        add_points_to_user(oa_user, oa_badge)
      end
      
      
    end
  end
  # Below works for if I need to get repeated earns of the same badge over many weeks.

  # SELECT users.first_name || ' ' || users.last_name, users.avatar, badges.name, badges.image_url, COUNT(badge_earnings.id) AS Badges 
  # FROM users 
  # INNER JOIN badge_earnings ON users.id = badge_earnings.user_id
  # INNER JOIN badges ON badge_earnings.badge_id = badges.id 
  # WHERE badge_earnings.created_at > now() - interval '4 weeks'
  # GROUP BY users.id, badges.name, badges.image_url
  # ORDER BY COUNT(badge_earnings.id) DESC
  # LIMIT 5

  def muses
    muses_arr_of_hash = User.find_by_sql("
      SELECT users.first_name || ' ' || users.last_name AS full_name, users.avatar, users.id AS user_id, COUNT(inspires.id) AS Inspires
      FROM users
      INNER JOIN inspires ON users.id = inspires.user_id
      INNER JOIN posts ON (posts.id = inspires.inspiring_entry_id AND inspiring_entry_type = 'Post')
      WHERE inspires.created_at > now() - interval '1 week'
      GROUP BY users.id
      ORDER BY COUNT(inspires.id) DESC
      LIMIT 5
    ")
    
    
      muses_arr_of_hash.each do |muse_user|
      muse_badge = Badge.find_by_name("Muse - Most Inspires this Week")
      badge_earning = BadgeEarning.new(
        Week: (Time.zone.today - 1.week)..Time.zone.today,
        Week_s: "#{(Time.zone.today - 1.week).to_formatted_s(:rfc822)} - #{Time.zone.today.to_formatted_s(:rfc822)}"
        )
        badge_earning.user = muse_user
        badge_earning.badge = muse_badge
        
      # Save the badge only if the user hasn't earned the same badge this week yet.
      if muse_user.badge_earnings.any?{|b_e| (b_e.Week === ((Time.zone.today - 1.week)..Time.zone.today)) && (b_e.badge_id = 2)} 
      else
        badge_earning.save
        add_points_to_user(muse_user, muse_badge)
      end
      
      
    end
  end

  def wild_growths
    wg_arr_of_hash = User.find_by_sql("
      SELECT users.first_name || ' ' || users.last_name AS full_name, users.avatar, users.id AS user_id, COUNT(posts.id) AS Posts
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
    ")
    
    
      wg_arr_of_hash.each do |wg_user|
      wg_badge = Badge.find_by_name("Wild Growths - Users whose Posts This Week Tripled")
      badge_earning = BadgeEarning.new(
        Week: (Time.zone.today - 1.week)..Time.zone.today,
        Week_s: "#{(Time.zone.today - 1.week).to_formatted_s(:rfc822)} - #{Time.zone.today.to_formatted_s(:rfc822)}"
        )
        badge_earning.user = wg_user
        badge_earning.badge = wg_badge
        
      # Save the badge only if the user hasn't earned the same badge this week yet.
      if wg_user.badge_earnings.any?{|b_e| (b_e.Week === ((Time.zone.today - 1.week)..Time.zone.today)) && (b_e.badge_id = 2)} 
      else
        badge_earning.save
        add_points_to_user(wg_user, wg_badge)
      end
      
      
    end
  end

  def add_points_to_user(user, badge)
    user.points += badge.points
  end

end
