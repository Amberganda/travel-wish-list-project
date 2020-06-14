class ItinerariesController < ApplicationController


    def index
        itineraries = Itinerary.all
        render json: itineraries, include: [:activities]
    end


    private
    def itinerary_params
        params.require(:itinerary).permit(:name)
    end


end
