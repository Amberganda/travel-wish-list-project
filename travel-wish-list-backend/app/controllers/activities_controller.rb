class ActivitiesController < ApplicationController

    def create
        @itinerary = Itinerary.find(params[:itinerary_id])
        @activity = @itinerary.activities.create(activity_params)
        # activity = Activity.create(activity_params)
        # pp @activity.itinerary
        render json: @activity, include: @itinerary, status: 200
    end

    def destroy
        activity = Activity.find(params[:id])
        activity.destroy
        head :no_content
    end



    private 
    def activity_params
        params.require(:activity).permit(:name)
    end

end
