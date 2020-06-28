class ActivitiesController < ApplicationController

    def create
        itinerary = Itinerary.find(params[:itinerary_id])
        activity = itinerary.activities.create(activity_params) # activity is an object
        # activity = Activity.create(activity_params)
        # pp @activity.itinerary
        render json: activity, include: itinerary, status: 200 # json converts that activity into a string
    end

    def destroy
        # activity = Activity.find(params[:id])
        # activity.destroy
        Activity.delete(params[:id])
        head :no_content  # header w/o body
    end



    private 
    def activity_params
        params.require(:activity).permit(:name)
    end

end
