class Api::V1::QuestsController < Api::ApplicationController

  def create
    quest = Quest.new(quest_params)
    if quest.save
      render json: { successful: true, message: "Quest saved! To edit further, click your quest from the Quests page."}
    else
      render json: { message: "Something went wrong, is everything formatted right? Are you logged in as a company admin?" } 
    end
  end

  def index
    quests = Quest.all.order(title: :desc)
    render json: quests
  end

  def show
    quest = Quest.friendly.find params[:id]
    render json: quest
  end

  def update
    quest = Quest.friendly.find params[:id]
    if params[:image].present?
      quest.image.attach(params[:image])
      render json: quest
    elsif quest.update quest_params
      render json: quest
    else 
      render json: { slug: quest.slug, message: quest.errors.full_messages }
    end
  end

  private

  def quest_params
    params.require(:quest).permit(:title, :description, :points_on_finish, :repeatable, :max_repeats, :image, quest_goals_attributes: [:id, :title, :description, :points, :image, :_destroy])
  end
end
