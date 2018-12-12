class Api::V1::UsersController < Api::ApplicationController

  # before_action :authenticate_user!

  def current
    render json: current_user
  end

  def show
    user = User.find params[:id]
    user_obj = {}

    user.posts.each do |p|
      user_obj.push(p.attributes)
    end

    badges = current_user&.badges

    render json: badges
  end

end
