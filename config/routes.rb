Rails.application.routes.draw do
  devise_for :users
  root to: 'top#index'
  resources :songs, path: 'repertoire'
  get 'search', to: 'search#index'

  get 'setlists', to: 'setlists#index'
  get 'setlists/new', to: 'setlists#index'
  get 'setlists/new/songs', to: 'setlists#index'
  get 'setlists/new/songs/repertoire', to: 'setlists#index'
  get 'setlists/:id', to: 'setlists#index'
  get 'setlists/:id/edit', to: 'setlists#index'

  namespace :api do
    resources :setlists
    resources :songs do
      collection do
        post 'random', to: 'songs#random'
      end
    end
  end
end
