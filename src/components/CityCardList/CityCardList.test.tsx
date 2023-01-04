import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { cityList } from "../../mockData";
import { CityCardList } from "./CityCardList";
import { renderComponent } from "../../utils/testUtils";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("<CityCardList/>", () => {
  it("Check if CityCards were rendered in CityCardList (cityList is not empty)", () => {
    const initialState = {
      weather: {
        error: undefined,
        cityList: cityList,
        selectedCity: undefined,
      },
    };

    renderComponent(<CityCardList />, { initialState });
    const cardItems = screen.getAllByTestId("city-card");
    expect(cardItems?.length).toEqual(initialState.weather.cityList.length);
  });

  it("Error message is rendered", () => {
    const initialState = {
      weather: {
        error: "Test error",
        cityList: [],
        selectedCity: undefined,
      },
    };

    renderComponent(<CityCardList />, { initialState });
    const errorMessage = screen.getByText("Test error");
    expect(errorMessage).toBeInTheDocument();
  });

  it("Redirecting to weather details page on card click", () => {
    const initialState = {
      weather: {
        error: undefined,
        cityList: cityList,
        selectedCity: undefined,
      },
    };

    renderComponent(<CityCardList />, { initialState });
    const firstCityCard = screen.getAllByTestId("city-card")[0];
    userEvent.click(firstCityCard);
    const expectedURL = `/weather/${initialState.weather.cityList[0].name}`;
    expect(mockNavigate).toHaveBeenCalledWith(expectedURL);
  });
});
