Rails.application.routes.draw do
  get 'dramas/index'
  get 'dramas/show'
  get 'dramas/create'
  get 'dramas/search_drama'
  get 'dramas/delete'
  get 'dramas/update'
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"
      mount_devise_token_auth_for "User", at: "auth"
      namespace :user do
        resource :confirmations, only: [:update]
      end
      namespace :current do
        resource :user, only: [:show]
        resources :spots, only: [:index, :show, :create, :update]
      end
      resources :spots, only: [:index, :show]
      resources :dramas, only: [:index, :show, ] do
        collection do
          get :search_drama
          get :detail_drama
        end
      end
    end
  end
end
