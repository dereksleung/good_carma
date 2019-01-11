class UserConfirmMailer < ApplicationMailer

  def notify_admin(user, company)
    @user = user
    @c_name = company.name
    @email = company.email


    mail(
      to: @email,
      subject: "#{@user.first_name} #{@user.last_name} joined! Are they truly yours?"
    )
  end

end
