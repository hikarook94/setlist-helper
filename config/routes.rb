Rails.application.routes.draw do
  root to: redirect('/setlists')
  resources :songs

  get 'setlists', to: 'setlists#index'
  get 'setlists/new', to: 'setlists#index'
  get 'setlists/:id', to: 'setlists#index'
  get 'setlists/:id/edit', to: 'setlists#index'

  namespace :api do
    resources :setlists
  end
end
