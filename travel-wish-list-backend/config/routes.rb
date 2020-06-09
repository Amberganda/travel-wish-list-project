Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :itineraries, only: [:index] do
    resources :activities, only: [:index, :destroy]
  end


end
