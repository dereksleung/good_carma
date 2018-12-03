Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get("/leaderboards", to: "leaderboards#main", as: :main_leaderboard)
      get("/leaderboards/silver", to: "leaderboards#silver", as: :silver_leaderboard)
      resources :posts do
        get("/posts/:id/tree", to: "posts#tree", as: :tree)
        resources :comments
        resources :inspires, shallow: true, only: [:create, :destroy]
        resources :inspiractions
        resources :sympathies
      end

      resources :users
      resource :sessions, only: [:new, :create, :destroy]
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
