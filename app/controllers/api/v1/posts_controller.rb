class Api::V1::PostsController < Api::ApplicationController

  # before_action :authenticate_user!, only: [:create, :destroy]
  # before_action :find_post, only: [:update, :destroy]
  # before_action :authorize_user!, only: [:update, :destroy]

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
    parents_id_arr = (post_params[:parent_ids]).split(",")
    post.user = current_user

    if post.save
      parents_id_arr.each do |id|
      parent = Post.find(id)
      post.parent_posts << parent
      end

      NewSilOrGoldUsersJob.perform_later(parents_id_arr)
    
      render json: post
    else
      render json: { errors: post.errors.full_messages }
    end

  end

  def update

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

  def find_post
    post = Post.find params[:id]
  end

  def authorize_user!
    unless can? :manage, post
      render(json: { errors: ["Unauthorized"]}, status: 401 )
    end
  end

end
