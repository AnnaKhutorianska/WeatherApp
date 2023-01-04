import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CityCard } from "./CityCard";
import { renderComponent } from "../../utils/testUtils";
import { useAppDispatch } from "../../store";

jest.mock("../../store");

describe("<CityCard/>", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as any).mockImplementation(() => dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Delete button click function is called", () => {
    renderComponent(<CityCard id={1} name={"Test city"} dt={1672769922} feels_like={12} temp={12} />);
    const mockOnClick = jest.fn();
    const deleteButton = screen.getByTestId('delete-btn');

    deleteButton.addEventListener("click", mockOnClick);
    fireEvent.click(deleteButton);

    expect(mockOnClick).toBeCalledTimes(1);
  });

  it("Delete dispatch function is called", async () => {
    renderComponent(<CityCard id={1} name={"Test city"} dt={1672769922} feels_like={12} temp={12} />);
    const deleteButton = screen.getByTestId('delete-btn');

    userEvent.click(deleteButton);

    expect(dispatch).toHaveBeenCalled();
  });

  it("Refresh button click function is called", () => {
    renderComponent(<CityCard id={1} name={"Test city"} dt={1672769922} feels_like={12} temp={12} />);
    const mockOnClick = jest.fn();
    const refreshButton = screen.getByTestId('refresh-btn');

    refreshButton.addEventListener("click", mockOnClick);
    fireEvent.click(refreshButton);

    expect(mockOnClick).toBeCalledTimes(1);
  });

  it("Refresh dispatch function is called", async () => {

    renderComponent(<CityCard id={1} name={"Test city"} dt={1672769922} feels_like={12} temp={12} />);
    const refreshButton = screen.getByTestId('refresh-btn');

    userEvent.click(refreshButton);

    expect(dispatch).toHaveBeenCalled();
  });
});
