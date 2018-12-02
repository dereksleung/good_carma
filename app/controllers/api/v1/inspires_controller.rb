class Api::V1::InspiresController < ApplicationController

  def create
    post = Post.find(params[:post_id])
    inspire = Inspire.new(user: current_user, post: post)
    inspire_count = Inspire.where("post_id = ?", params[:post_id]).count

    if inspire.save
      render json: inspire_count
    else
      render json: { errors: inspire.errors.full_messages, inspire_count }
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



end
