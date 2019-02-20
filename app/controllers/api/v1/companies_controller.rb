class Api::V1::CompaniesController < Api::ApplicationController

  def create
    company = Company.new company_params
    c_admin_user = User.new(first_name: params[:company][:name], email: params[:company] [:email], password: params[:company][:password], password_confirmation: params[:company][:password_confirmation])
    
    if company.save
      c_admin_user.company_id = company.id
      c_admin_user.confirmed = true
      if c_admin_user.save
        CompanyConfirmMailer.notify_admin(company).deliver
        render json: { status: :success, message: "Successfully signed up! Someone at your company will need to verify you before you can start." }
      else 
        render json: { status: 422, message: c_admin_user.errors.full_messages, errors: c_admin_user.errors.full_messages }
      end
    else
      render json: { status: 422, message: company.errors.full_messages, errors: company.errors.full_messages }
    end
  end

  def confirmation
    confirm_token = params[:company_id]
    company = Company.find_by(confirm_token: confirm_token)
    company.confirmed = true
    company.save
    
    c_admin_user = User.find_by(email: company.email)
    slug = c_admin_user.slug

    # if Apartment::Tenant.current == "public"
    #   subdomain = ""
    # else
    #   subdomain = "#{Apartment::Tenant.current}."
    # end

    if company.errors.present?
      render json: { message: company.errors.full_messages }
    end

    if Rails.env.development?
      render json: { message: "Your company is confirmed! Try signing in with the link above!" }
      # redirect_to("#{subdomain}localhost:3001/users/#{slug}")
    elsif Rails.env.production?
      redirect_to "https://goodcarma.herokuapp.com"
      # redirect_to(api_v1_user_url(slug))
      # redirect_to("#{subdomain}goodcarma.herokuapp.com/users/#{slug}")
    end
  end

  private

  def company_params
    params.require(:company).permit(:name, :email, :password, :password_confirmation)
  end
end
