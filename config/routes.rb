Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    namespace :v1 do

      match "/delayed_job" => DelayedJobWeb, :anchor => false, :via => [:get, :post]

      get("/leaderboards", to: "leaderboards#main", as: :main_leaderboard)
      get("/leaderboards/silver", to: "leaderboards#silver", as: :silver_leaderboard)
      get("/leaderboards/gold", to: "leaderboards#gold", as: :gold_leaderboard)
      get("/leaderboards/two_wk_users", to: "leaderboards#two_wk_users", as: :two_wk_users_leaderboard)
      get("/leaderboards/most_i_actions_this_week", to: "leaderboards#most_i_actions_this_week", as: :miatw_leaderboard)
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
        
        resources :follows, shallow: true, only: [:create, :destroy]
        get("/follows/check", to: "follows#check", as: :check_if_followed)
        get("/followers", to: "follows#show_followers", as: :show_followers)
        get("/followed_users", to: "follows#show_followed_users", as: :show_followed_users)
      end


      resources :companies, only: [:create]

      resource :sessions, only: [:create, :destroy]
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
