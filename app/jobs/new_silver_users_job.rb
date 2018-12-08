class NewSilverUsersJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
    User.includes(posts: [:child_posts])
  end
end
