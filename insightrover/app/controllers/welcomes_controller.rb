class WelcomesController < ApplicationController
  require 'uri'
  require 'net/http'

  def welcome
     uri = URI('http://localhost:8000/weather')
     response = Net::HTTP.get(uri)


     array = response.split(",")

     @rover = array
  end

end
