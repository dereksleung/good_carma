class Api::V1::CommentsController < Api::ApplicationController

  before_action :authenticate_user!, only: [:create, :destroy]
  before_action :find_comment, only: [:show, :update, :destroy]
  before_action :authorize_user!, only: [:destroy]

  def create
    post = Post.friendly.find params[:post_id]
    comment = Comment.new comment_params
    
    comment.post = post
    comment.user = current_user
    
    if comment.save
      render json: comment
    else
      render json: {status: 400, errors: comment.errors.full_messages}
    end

  end

  def show

  end 

  def update
    @comment.slug = nil
    if @comment.update comment_params
      render json: @comment
    else
      render json: {status: 400, errors: @comment.errors.full_messages}
    end
  end

  def destroy
    @comment.destroy


  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end

  def find_comment
    Comment.friendly.find params[:id]
  end

  def authorize_user!
    unless can? :manage, @comment
      render json: {status: 403, errors: @comment.errors.full_messages, message: "You're not authorized for this, can you sign in as someone who is?"}
    end
  end

end
