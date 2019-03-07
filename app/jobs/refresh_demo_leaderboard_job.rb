class RefreshDemoLeaderboardJob < ApplicationJob
  queue_as :default

  def perform(*args)
    refresh_dates
  end

  private

  def refresh_dates
    Post.all.each {|p|
      p.update(created_at: Time.now - rand(3600..3600*24*9))
    }
    Inspire.all.each {|i|
      i.update(created_at: Time.now - rand(3600..3600*24*9))
    }
    Comment.all.each {|c|
      c.update(created_at: Time.now - rand(3600..3600*24*9))
    }
    BadgeEarning.all.each {|b|
      b.update(created_at:Time.now - rand(3600..3600*24*9))
    }
  end

end
