class Api::V1::InspiresController < Api::ApplicationController

  def create
  
    inspire = Inspire.new(inspire_params)
    inspire.user = current_user
    insp_entry_id = params[:postId]
    inspire_count = Inspire.where("inspiring_entry_type = ? AND inspiring_entry_id = ?", params[:inspiring_entry_type], insp_entry_id).count

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
    params.require(:inspire).permit(:inspiring_entry_type, :postId, :color)
  end


end
