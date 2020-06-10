class ItinerariesController < ApplicationController


    def index
        itineraries = Itinerary.all
        render json: itineraries
    end

    def create
        itinerary = Itinerary.new(itinerary_params)
        # if itinerary.save
        #     render json: itinerary, status: :accepted
        # else
        #     render json: {errors: itinerary.errors.full_messages}, status: :unprocessible_entity
    end

    def itinerary_params
        params.require(:itinerary).permit(:name)
    end


end
