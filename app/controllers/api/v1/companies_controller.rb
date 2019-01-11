class Api::V1::CompaniesController < Api::ApplicationController

  def create
    company = Company.new company_params

    if company.save
      render json: { status: :success, message: "Successfully signed up!" }
    else
      render json: { status: 422, message: company.errors.full_messages, errors: company.errors.full_messages }
    end
  end

  private

  def company_params
    params.require(:company).permit(:name, :email, :password, :password_confirmation)
  end
end
