class ItinerariesController < ApplicationController
    


    def index
        itineraries = Itinerary.all
        render json: itineraries, status: 200
    end


    private
    def itinerary_params
        params.require(:itinerary).permit(:name)
    end


end
