# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Post.delete_all
User.delete_all

PASSWORD = "supersecret"

super_user = User.create(
  first_name: "Derek",
  last_name: "Leung",
  email: "derek@leung.com",
  password: PASSWORD
)

4.times do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name

  u = User.create(
    first_name: first_name,
    last_name: last_name,
    email: "#{first_name.downcase}.#{last_name.downcase}@example.com",
    password: PASSWORD
  )
end

users = User.all

15.times do
  p = Post.create(
    body: Faker::Hipster.paragraph(2,true,3),
    user: users.sample
  )
end

posts = Post.all

# 10.times do
#   p = posts.sample
#   unless p.parent.present?
#     p.parent = posts.sample
#   end
# end

