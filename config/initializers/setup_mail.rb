ActionMailer::Base.smtp_settings = {
  address: "smtp.gmail.com",
  port: "587",
  enable_starttls_auto: true,
  authentication: :plain,
  user_name: Rails.application.credentials[:email_username],
  password: Rails.application.credentials[:email_password]
}