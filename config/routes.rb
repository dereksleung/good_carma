Rails.application.routes.draw do
  
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    namespace :v1 do

      match "/delayed_job" => DelayedJobWeb, :anchor => false, :via => [:get, :post]

      resources :posts do
        get("/tree", to: "posts#tree", as: :tree)
        get("/i_tree", to: "posts#i_tree", as: :i_tree)
        resources :comments
        resources :inspires, shallow: true, only: [:create, :show, :destroy]
        resources :inspiractions
        resources :sympathies
      end

      resources :users do
        get :current, on: :collection
        get("/confirmation/:all_else", to: "users#confirmation", as: :confirmation)
        get("/confirmation", to: "users#confirmation", as: :confirmation_2)
        get("search", on: :collection)
        
        resources :follows, shallow: true, only: [:create, :destroy]
        get("/follows/check", to: "follows#check", as: :check_if_followed)
        get("/followers", to: "follows#show_followers", as: :show_followers)
        get("/followed_users", to: "follows#show_followed_users", as: :show_followed_users)

      end

      resources :companies, only: [:create] do
        get("/confirmation", to: "users#confirmation", as: :confirmation)
      end

      resource :sessions, only: [:create, :destroy]

      get("/leaderboards", to: "leaderboards#main", as: :main_leaderboard)
      get("/leaderboards/silver", to: "leaderboards#silver", as: :silver_leaderboard)
      get("/leaderboards/gold", to: "leaderboards#gold", as: :gold_leaderboard)
      get("/leaderboards/two_wk_users", to: "leaderboards#two_wk_users", as: :two_wk_users_leaderboard)
      get("/leaderboards/trailblazers_this_week", to: "leaderboards#most_i_actions_this_week", as: :miatw_leaderboard)
      get("/leaderboards/overachievers_this_week", to: "leaderboards#overachievers_this_week", as: :oa_tw_leaderboard)
      get("/leaderboards/muses_this_week", to: "leaderboards#muses_this_week", as: :m_tw_leaderboard)
      get("/leaderboards/fonts_of_inspiration_this_week", to: "leaderboards#foi_this_week", as: :foi_tw_leaderboard)
      get("/leaderboards/wild_growths_this_week", to: "leaderboards#wild_growths_this_week", as: :wg_tw_leaderboard)
    end
  end

  resources :posts do
    resources :comments
    resources :inspires, shallow: true, only: [:create, :destroy]
    resources :inspiractions
    resources :sympathies
  end

  resources :users
  resource :sessions, only: [:new, :create, :destroy]

end
