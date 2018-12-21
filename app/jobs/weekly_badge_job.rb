class WeeklyBadgeJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
    trailblazer
    # overachievers(args[0])
    # muses(args[0])
    # thought_provokers(args[0])
    # wild_growths(args[0])

    WeeklyBadgeJob.set(run_at: 1.week.from_now).perform_later
    
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
      end

  
    end
  end

end
