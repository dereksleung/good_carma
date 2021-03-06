# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Comment.destroy_all
Post.destroy_all
User.destroy_all

PASSWORD = "supersecret"

super_user = User.create(
  first_name: "Derek",
  last_name: "Leung",
  email: "derek@leung.com",
  password: PASSWORD,
  avatar: Faker::Avatar.image("", "50x50"),
  level: "gold"
)

4.times do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name

  u = User.create(
    first_name: first_name,
    last_name: last_name,
    email: "#{first_name.downcase}.#{last_name.downcase}@example.com",
    password: PASSWORD,
    avatar: Faker::Avatar.image("", "50x50")
  )
end

users = User.all

15.times do
  p = Post.create(
    body: Faker::HarryPotter.quote,
    user: users.sample,
    picture_url: Faker::LoremFlickr.image("960x540", ['volunteer'])
  )

  if p.valid?
    rand(0..6).times do
      p.comments << Comment.new(
        body: Faker::HarryPotter.quote,
        user: users.sample
      )
    end
  end
end

posts = Post.all

2.times do 
  p = posts.sample
  p.update(
    color: "gold"
  )
end

p = Post.first
pchild1 = posts.sample
pchild2 = posts.sample
pgrandchild1 = posts.sample
p.child_posts << pchild1
p.child_posts << pchild2
pchild1.child_posts << pgrandchild1

# Add Inspires
c = Company.find_by(name: "Demo")
users = c.users
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

# Ensuring Leaderboard Entries Exist
  # Newcomers

2.times do
  user = User.all.sample
  Post.where({user: user}).each do |post|
    post.update(created_at: Time.now - rand(3600..3600*24*9))
  end
end

# Weekly Trailblazers(Inspiractions)

posts = Post.all

posts.each {|p|
  while p.child_posts.length < 4 do
    cp = posts.sample
    unless p.child_posts.include?(cp)
      p.child_posts << cp
    end
  end
}


# 10.times do
#   p = posts.sample
#   unless p.parent.present?
#     p.parent = posts.sample
#   end
# end

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?