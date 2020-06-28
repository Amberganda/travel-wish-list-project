class ItinerariesController < ApplicationController

    def index #method
        itineraries = Itinerary.all
        render json: itineraries
    end

end
