class Api::V1::PostsController < ApplicationController

  def index
    posts = Post.order(created_at: :desc)
    render json: posts
  end

  def show
    post = Post.find params[:id]
    render json: post
  end

  def destroy
    post = Post.find params[:id]
    post.destroy

    render json: { status: :success }
  end

  def create
    post = Post.new post_params
    
    par_id = params.post.parent_id
    if par_id.present?
      post.parent = Post.find[]

    
  end

  private

  def post_params
    params.require(:post).permit(:body, :picture_url, :parent_id)
  end

end
