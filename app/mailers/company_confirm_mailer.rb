class CompanyConfirmMailer < ApplicationMailer

  def notify_admin(company)
    @company = company

    mail(
      to: @company.email,
      subject: "Your company, #{@company.name} joined! Is this truly from you?"
    )

  end
end
