class Api::V1::PostsController < Api::ApplicationController


  before_action :authenticate_user!, only: [:create, :destroy]
  before_action :find_company, only: [:index]
  before_action :find_post, only: [:update, :destroy]
  before_action :authorize_user!, only: [:update, :destroy]
  before_action :check_user_confirm, except: [:show, :index]

  def index
    if user_signed_in?
      posts = Post.where({company_id: @curr_company}).with_attached_image.order(created_at: :desc)
    else 

      posts = Post.where({company_id: Company.find_by_name("Demo").id}).with_attached_image.order(created_at: :desc)
    end

    render json: posts
  end

  def show
    post = Post.friendly.find params[:id]
    render json: post
  end

  def destroy
    post = Post.friendly.find params[:id]
    post.destroy

    render json: { status: :success }
  end

  def create
    post = Post.new post_params

    if params[:parent_ids].present?
      parents_id_arr = (post_params[:parent_ids]).split(",")
    end
    post.user = current_user
    post.company_id = current_user.company_id
    
    if post.save
      if params[:image].present?
        post.image.attach(params[:image])
      end
      assign_inspiractions(post)
      NewSilOrGoldUsersJob.perform_later(parents_id_arr)
      render json: post
    else
      render json: { errors: post.errors.full_messages }
    end

  end

  def update

    if params[:image].present?
      @post.image.attach(params[:image])
      # if @post.update post_params
      #   assign_inspiractions(@post)
        render json: @post
      # end
    elsif @post.update post_params
      assign_inspiractions(@post)
      render json: @post
    else
      render(json: {slug: @post.slug, errors: @post.errors.full_messages, message: @post.errors.full_messages})
    end
    
  end

  def tree
    post = Post.friendly.find params[:post_id]
    # @gen_query = post.generations(1,1)
    @gen_query = post.rcrsv_generations(post, 3)
    render json: @gen_query
  end

  def ser_tree
    post = Post.friendly.find params[:post_id]
    
    render json: @gen_query
  end

  def i_tree
    # post = Post.friendly.find params[:post_id]
    @gen_query = Post.i_generations(params[:post_id])
    render json: @gen_query

    # render json: post
  end

  private

  def check_user_confirm
    if user_signed_in?
      unless current_user.confirmed == true
        render(json: { message: "You are not yet confirmed! Contact your company admin."}, status: 401 )
      end
    end
  end

  def find_tenant
    if user_signed_in?
      if current_user.companies.present?
        # Apartment::Tenant.switch("#{current_user.company.name}")
      else 
        # Calling .switch with no argument switches to the `public` schema.
        # Apartment::Tenant.switch()
      end
    else
      # Apartment::Tenant.switch() 
    end
  end

  def assign_inspiractions(post)
    if params.include?(:parent_ids)
      parents_id_arr = (params[:parent_ids]).split(",")
    
      parents_id_arr.each do |id|
        parent_p = Post.friendly.find(id)
        if parent_p.user.id != session[:user_id]
          post.parent_posts << parent_p
          parent_p.user.points += 100
        end
      end
    end
  end


  def post_params
    params.require(:post).permit(:body, :picture_url, :parent_ids, :image)
  end

  def find_post
    @post = Post.friendly.find params[:id]
  end

  def authorize_user!
    unless can? :manage, @post
      render(json: { errors: ["Unauthorized"], message: "You're not authorized for this, can you sign in as someone who is?"}, status: 401 )
    end
  end

  def find_company
    if user_signed_in?
      @curr_company = current_user.company.id
    else
      @curr_company = Company.find_by_name("Demo").id
    end
  end

end
