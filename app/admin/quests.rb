ActiveAdmin.register Quest do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
  permit_params :title, :description, :finished_bonus_points, :repeatable, :max_repeats, :slug

  sidebar "Quest Goals", only: [:show, :edit, :destroy] do
    ul do
      li link_to "Quest Goals", admin_quest_quest_goals_path(resource)
    end
  end

  ActiveAdmin.register QuestGoal do
    belongs_to :quest
    permit_params :quest_id, :title, :description, :points, :repeatable, :max_repeats
  end

end
