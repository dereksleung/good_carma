class Api::V1::PostsController < Api::ApplicationController

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
    post.parent_id = null
    parents_id_arr = post_params[:parent_ids]
    post.user = current_user

    parents_id_arr.each do |id|
      parent = Post.find(id)
      post.parent_posts << parent
    end
    
    if post.save
      render json: post
    else
      render json: { errors: post.errors.full_messages }
    end

  end

  def tree
    post = Post.find params[:post_id]
    @gen_query = post.generations(1,1)

    render json: @gen_query
  end

  private

  def post_params
    params.require(:post).permit(:body, :picture_url, :parent_ids)
  end

end
