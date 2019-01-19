class Api::V1::FollowsController < Api::ApplicationController

  def check
    follower = current_user
    followed_user = User.find(params[:user_id])

    follow = Follow.find_by(follower_id: follower.id, followed_user_id: followed_user.id)

    if follow.present?
      new_obj = {followed: true, follow_id: follow.id}.to_json

      render json: new_obj
    else 
      new_obj = {followed: false, follow_id: nil}.to_json
      render json: new_obj
    end

  end

  def create
    followed_user = User.find(params[:user_id])
    follow = Follow.new(follower_id: current_user.id, followed_user_id: followed_user.id)

    if follow.save
      render json: {followed: true, follow_id: follow.id}
    else
      render json: {message: follow.errors.full_messages}
    end

    # user.append_follow(user, current_user)
    # render json: user
  end

  def destroy
    follow = Follow.find params[:id]

    if follow.destroy
      render json: {followed: false, follow_id: nil}
    else
      render json: {message: follow.errors.full_messages}
    end
  end

  def show_followers
    user = User.find params[:user_id]
    followers = user.followers.with_attached_avatar_image

    render json: followers
  end

  def show_followed_users
    user = User.find params[:user_id]
    followed_users = user.followed_users.with_attached_avatar_image

    render json: followed_users
  end




end
