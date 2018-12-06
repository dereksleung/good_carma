class Api::V1::InspiresController < Api::ApplicationController

  def create
  
    
    inspire = Inspire.new(inspire_params)
    inspire.user = current_user
    insp_entry_id = params[:postId]

    if params[:inspiring_entry_type] == "Post"
      inspire.inspiring_entry = Post.find insp_entry_id
    elsif params[:inspiring_entry_type] == "Comment"
      inspire.inspiring_entry = Comment.find insp_entry_id
    end

    insp_entry = inspire.inspiring_entry

    if params[:color] == "gold"
      insp_entry.update(color: "gold")
    elsif params[:color] == "silver"
      insp_entry.update(color: "silver")
    end

    if inspire.save
      render json: insp_entry
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
