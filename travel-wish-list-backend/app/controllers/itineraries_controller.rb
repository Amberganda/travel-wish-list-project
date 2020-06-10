class ItinerariesController < ApplicationController


    def index
        itineraries = Itinerary.all
        render json: itineraries
    end

    def create
        itinerary = Itinerary.new(itinerary_params)
    end

    def itinerary_params
        params.require(:itinerary).permit(:name)
    end


end
