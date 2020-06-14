class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :name, :itinerary_id
  belongs_to :itinerary
end
