ActiveAdmin.register Post do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
  permit_params :body, :user_id, :picture_url, :parent_ids, :slug, :color

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
  permit_params :user_id, :slug, :body, :post_id

end

# ActiveAdmin.register Inspire do
#   belongs_to :post
# end