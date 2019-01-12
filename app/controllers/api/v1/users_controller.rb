class Api::V1::UsersController < Api::ApplicationController

  before_action :set_mailer_host, only: [:create]
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
    user.avatar_image.attach(params[:user][:avatar_image])

    if u.save
      UserConfirmMailer.notify_admin(u,company).deliver
      render json: { status: :success, message: "Successfully signed up! Your admin will need to verify you before you can start." }
    else
      render(json: {status: 422, errors: u.errors.full_messages, message: u.errors.full_messages})
    end
  end

  def confirmation
    confirm_token = params[:user_id]
    user = User.find_by(confirm_token: confirm_token)
    user.confirmed = true
    full_name = user.full_name
    
    subdomain = Apartment::Tenant.current

    if Rails.env.development?
      redirect_to("localhost:3001/users/#{full_name}/confirmation")
    elsif Rails.env.production?
      redirect_to("subdomain.good_carma.herokuapp.com/users/#{full_name}/confirmation")
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def set_mailer_host

  end
end
