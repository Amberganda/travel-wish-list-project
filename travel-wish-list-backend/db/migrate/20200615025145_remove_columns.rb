class RemoveColumns < ActiveRecord::Migration[6.0]
  def change
    remove_column :activities, :description
    remove_column :activities, :duration_hours
    
  end
end
