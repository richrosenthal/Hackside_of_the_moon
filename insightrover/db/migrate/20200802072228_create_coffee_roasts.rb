class CreateCoffeeRoasts < ActiveRecord::Migration[6.0]
  def change
    create_table :coffee_roasts do |t|
      t.string :roast_name
      t.text :roast_description

      t.timestamps
    end
  end
end
