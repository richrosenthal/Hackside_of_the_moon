Rails.application.routes.draw do
  resources :coffee_roasts
  get '/' => 'welcomes#welcome'
  get '/sendSMS' => 'sms#send'

  resources :sms
  resources :welcomes
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
