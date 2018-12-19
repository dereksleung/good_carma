class Api::V1::UsersController < Api::ApplicationController

  # before_action :authenticate_user!

  def current
    render json: current_user
  end

  def show
    user = User.find params[:id]
    render json: user
  end

end
