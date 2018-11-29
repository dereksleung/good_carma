class ApplicationController < ActionController::Base

  private

  def current_user
    if session[:user_id].present?
      @current_user ||= User.find(session[:user_id])
    end
  end

  def user_signed_in?
    current_user.present?
  end

  def authenticate_user!
    unless user_signed_in?
      render(json: { errors: ["Unauthorized"]}, status: 401)
    end
  end
  
end
