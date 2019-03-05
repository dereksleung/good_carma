class Api::V1::InspiresController < Api::ApplicationController

  def create
    
    inspire = Inspire.new(inspire_params)
    inspire.user = current_user

    if params[:inspiring_entry_type] == "Post"
      post = Post.friendly.find(params[:post_id])
      if post.inspires.detect {|i| i.user_id == current_user.id}.blank?
        inspire.inspiring_entry = post
        post.user.points += 2
      else
        render json: {errors: "You can't Inspire the same post twice."}
      end
    elsif params[:inspiring_entry_type] == "Comment"
      comment = Comment.friendly.find(params[:post_id, :id])
      if comment.inspires.detect {|i| i.user_id == current_user.id}.blank?
        inspire.inspiring_entry = comment
      else 
      render json: {errors: "You can't Inspire the same comment twice."}
      end
    end 

    insp_entry = inspire.inspiring_entry

    if params[:color] == "gold"
      insp_entry.color = gold
    elsif params[:color] == "silver"
      insp_entry.color = "silver"
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
    post = Post.friendly.find params[:post_id]
  end

  def inspire_params
    params.require(:inspire).permit(:inspiring_entry_type, :color)
  end


end
