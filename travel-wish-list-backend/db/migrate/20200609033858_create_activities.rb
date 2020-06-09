class CreateActivities < ActiveRecord::Migration[6.0]
  def change
    create_table :activities do |t|
      t.belongs_to :itinerary
      
      t.string :name
      t.string :description
      t.integer :duration_hours

      t.timestamps
    end
  end
end
