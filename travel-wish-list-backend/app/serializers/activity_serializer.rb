class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :name, :itinerary_id #this is the subset that I want to include. 
  belongs_to :itinerary 
end
