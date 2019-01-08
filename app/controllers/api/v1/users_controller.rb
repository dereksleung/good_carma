class Api::V1::UsersController < Api::ApplicationController

  # before_action :authenticate_user!

  def current
    c_u = nil
    # if user_signed_in? == true


    render json: current_user
  end

  def show
    user = User.find params[:id]
    render json: user
    BadgeCheckJob.perform_now(user.email)
  end

end
