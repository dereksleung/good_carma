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

  def create
    u = User.new user_params
    company = Company.find_by_email(params[:user][:company_email])
    u.companies << company

    if u.save
      UserConfirmMailer.notify_admin(u,company)
      render json: { status: :success, message: "Successfully signed up!" }
    else
      render(json: {status: 422, errors: u.errors.full_messages, message: u.errors.full_messages})
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

end
