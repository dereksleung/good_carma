class Api::V1::QuestsController < Api::ApplicationController

  def create
    quest = Quest.new(quest_params)
    if quest.save
      render json: { successful: true, message: "Quest saved! To edit further, click your quest from the Quests page."}
    else
      render json: { message: "Something went wrong, is everything formatted right?" } 
    end
  end

  def index

  end

  def show

  end

  def update

  end

  private

  def quest_params
    params.require(:quest).permit(:title, :description, :points_on_finish, :repeatable, :max_repeats, quest_goals_attributes: [:id, :title, :description, :points, :image, :_destroy])
  end
end
