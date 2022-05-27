Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do 
    #likes
    resources :likes, only: [:create, :destroy]
    #posts
    get '/home_feed', to: 'posts#show_home_feed'
    resources :posts, only: [:create, :destroy, :update]
    #sessions
    post '/login', to: 'session#create'
    delete '/logout', to: 'session#destroy'
    get '/auto_login', to: 'session#auto_login'

    #users
    post '/signup', to: 'users#create'
    resources :users, only: [:index, :show]
    post '/users/:id/attach_new_profile_picture', to: 'users#attach_new_profile_picture'
    post '/users/:id/attach_new_cover_photo', to: 'users#attach_new_cover_photo'

    #friendships
    resources :friendships, only: [:create, :destroy]

    #comments
    resources :comments, only:[:create, :destroy, :update]
  end


end
