class RefreshDemoLeaderboardJob < ApplicationJob
  queue_as :default

  def perform(*args)
    new_blood_and_up_and_comings
    inspires
    trailblazers
  end

  private

  def new_blood_and_up_and_comings
    c = Company.find_by(name: "Demo")
    users = c.users
    2.times do
      user = users.sample
      Post.where({user: user}).each do |post|
        post.update(created_at: Time.now - rand(3600..3600*24*9))
      end
    end
  end

  def inspires
    Inspire.destroy_all
    Post.all.each {|post| 
      rand(7..25).times do
        i_user = users.sample
        if post.user != i_user
          i = Inspire.new(user: i_user)
          u_color = i_user.level
          if u_color.present?
            i.color = i_user.level
          end
          post.inspires << i
        end
      end
    }

  end

  def trailblazers
    5.times do
      posts = Post.all
      post = posts.sample
      
      rand(2..6).times do
        if post.child_posts.present?
          post.child_relations.each do |cr|
            cr.update(created_at: Time.now - rand(3600..3600*24*7))
          end
          break
        else
          post.child_posts << posts.sample
        end
      end
    
    end
  end

end
