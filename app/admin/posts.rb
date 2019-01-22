ActiveAdmin.register Post do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
  permit_params :list, :of, :attributes, :on, :model

  sidebar "Post Details", only: [:show, :edit, :delete] do
    ul do
      li link_to "Comments", admin_post_comments_path(resource)
      li link_to "Inspires", admin_post_inspires_path(resource)
    end
  end


#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

end

ActiveAdmin.register Comment do
  belongs_to :post
end

ActiveAdmin.register Inspire do
  belongs_to :post
end