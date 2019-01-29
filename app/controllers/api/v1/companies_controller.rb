class Api::V1::CompaniesController < Api::ApplicationController

  def create
    company = Company.new company_params

    if company.save
      CompanyConfirmMailer.notify_admin(company).deliver
      render json: { status: :success, message: "Successfully signed up! Someone at your company will need to verify you before you can start." }
    else
      render json: { status: 422, message: company.errors.full_messages, errors: company.errors.full_messages }
    end
  end

  def confirmation
    confirm_token = params[:company_id]
    company = Company.find_by(confirm_token: confirm_token)
    company.confirmed = true
    company.save
    
    slug = user.slug

    if Apartment::Tenant.current == "public"
      subdomain = ""
    else
      subdomain = "#{Apartment::Tenant.current}."
    end

    if Rails.env.development?
      redirect_to("#{subdomain}lvh.me:3001/users/#{slug}")
    elsif Rails.env.production?
      redirect_to("#{subdomain}good_carma.herokuapp.com/users/#{slug}")
    end
  end

  private

  def company_params
    params.require(:company).permit(:name, :email, :password, :password_confirmation)
  end
end
