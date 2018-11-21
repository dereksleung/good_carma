Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :posts do
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
