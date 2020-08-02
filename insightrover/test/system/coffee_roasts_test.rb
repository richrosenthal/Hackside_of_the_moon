require "application_system_test_case"

class CoffeeRoastsTest < ApplicationSystemTestCase
  setup do
    @coffee_roast = coffee_roasts(:one)
  end

  test "visiting the index" do
    visit coffee_roasts_url
    assert_selector "h1", text: "Coffee Roasts"
  end

  test "creating a Coffee roast" do
    visit coffee_roasts_url
    click_on "New Coffee Roast"

    fill_in "Roast description", with: @coffee_roast.roast_description
    fill_in "Roast name", with: @coffee_roast.roast_name
    click_on "Create Coffee roast"

    assert_text "Coffee roast was successfully created"
    click_on "Back"
  end

  test "updating a Coffee roast" do
    visit coffee_roasts_url
    click_on "Edit", match: :first

    fill_in "Roast description", with: @coffee_roast.roast_description
    fill_in "Roast name", with: @coffee_roast.roast_name
    click_on "Update Coffee roast"

    assert_text "Coffee roast was successfully updated"
    click_on "Back"
  end

  test "destroying a Coffee roast" do
    visit coffee_roasts_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Coffee roast was successfully destroyed"
  end
end
