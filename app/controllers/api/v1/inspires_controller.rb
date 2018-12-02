class Api::V1::InspiresController < Api::ApplicationController

  def create
    post = Post.find(params[:post_id])
    inspire = Inspire.new(inspire_params)
    inspire.user = current_user
    inspire_count = Inspire.where("post_id = ?", params[:post_id]).count

    if inspire.save
      render json: inspire_count
    else
      render json: { errors: inspire.errors.full_messages }
    end
  end

  def destroy
    inspire = Inspire.find params[:id]
    inspire.destroy

    inspire_count = Inspire.where("post_id = ?", params[:post_id]).count

    render json: inspire_count

  end

  private
  
  def find_post
    post = Post.find params[:post_id]
  end

  def inspire_params
    params.require(:inspire).permit(:inspiring_entry_type)
  end


end
