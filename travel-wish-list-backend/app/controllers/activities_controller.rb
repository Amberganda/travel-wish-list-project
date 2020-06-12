class ActivitiesController < ApplicationController

    def create
        itinerary = Itinerary.find(params[:itinerary_id])
        activity = itinerary.activities.create(activity_params)
        # activity = Activity.create(activity_params)
        render json: activity
    end

   


    private 
    def activity_params
        params.require(:activity).permit(:name)
    end


end
