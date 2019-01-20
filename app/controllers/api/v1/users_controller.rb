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

  def update
    user = User.find params[:id]
    
    # Image uploads happen separately from other profile updates, hence the renders ending early.
    if params[:avatar_image].present?
      user.update avatar_params
      user.avatar_image.attach(params[:avatar_image])
      render json: user
    elsif params[:splash_image].present?
      user.update splash_params
      user.splash_image.attach(params[:splash_image])
      render json: user
    elsif params[:user].present?
      user.update user_params
      render json: { status: :success, message: "Successfully updated!" }
    else
      render(json: {status: 422, errors: user.errors.full_messages, message: user.errors.full_messages})
    end
  end

  def search 
    byebug
    results = User.search(params[:query])
    render json: results
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :avatar_image, :splash_image)
  end

  def avatar_params
    params.permit(:avatar_image)
  end

  def splash_params
    params.permit(:splash_image)
  end

  def set_mailer_host

  end
end
