class QuestGoal < ApplicationRecord

  belongs_to :quest
  
  has_one_attached :image

  extend FriendlyId
  friendly_id :title, use: [:slugged, :history, :finders]

  private

  def update_quest_hstore(quest_goal, quest)
    quest.all_quest_goals["#{quest_goal.title}"] = false
    # hstore will store "false" as a string. Reconvert when retrieving!
    
  end

end
