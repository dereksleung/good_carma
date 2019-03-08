# README

Good CARma is a "Community Activity Rewarder," a platform for organizations rallying their members around a cause either temporarily or permanently, such as businesses or non-profits. It harnesses the reward factors of acknowledgement and gamification to create a strongly positive environment that encourages more activity.

## Ruby version
You need Ruby 2.5.1.

## Other Dependencies
Clone this repo, then start by running `bundle` in your terminal in the repo root folder to get all the gems.

Install PostgreSQL as your database if you don't have it yet. 

The `bundle` command will install the `pg` gem that lets Rails communicate with Postgres through its ActiveRecord ORM.

You do not have my master key, so you will need to regenerate a master key for yourself to do many things. 
There's [good instructions here.](https://gist.github.com/db0sch/19c321cbc727917bc0e12849a7565af9) 
This is a [good backgrounder](https://www.engineyard.com/blog/rails-encrypted-credentials-on-rails-5.2) on Rails credentials. This [documents an error I myself came across](https://medium.com/craft-academy/encrypted-credentials-in-ruby-on-rails-9db1f36d8570) where you need to use the `--wait` flag when trying to edit credentials using other editors, where the credentials weren't saving properly after I closed the file.

My storage is set up as the local disk in development, but Amazon S3 in production. You won't be able to use my encrypted S3 credentials in production as you do not have my master key. You're free to use the linked instructions above to set up your own encrypted storage credentials though!

## Database Creation
Rails makes this easy.

In the terminal, run `rails db:create` and `rails db:schema:load`

## Running it Locally

Run the Rails server in one terminal window with `rails s`
Run the React client in another terminal window, by first: 
* changing directories with `cd react_client/good_carma` 
* starting the React client with `npm start`

