Rails.application.routes.draw do
  root to: redirect('/setlists')
  resources :songs

  get 'setlists', to: 'site#index'
  get 'setlists/new', to: 'site#index'
  get 'setlists/:id', to: 'site#index'
  get 'setlists/:id/edit', to: 'site#index'

  namespace :api do
    resources :setlists
  end
end
