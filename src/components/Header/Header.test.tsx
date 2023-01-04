import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Header } from "./Header";
import { renderComponent } from "../../utils/testUtils";
import { useAppDispatch } from "../../store";

jest.mock("../../store");

describe("<Header/>", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as any).mockImplementation(() => dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Header component is rendered", () => {
    renderComponent(<Header />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("Changing input value in seacrh field", () => {
    renderComponent(<Header />);
    const searchInput = screen.getByPlaceholderText("Search city");
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: "Test" } });
    expect(searchInput).toHaveValue("Test");
  });

  it("Add button click function is called", () => {
    renderComponent(<Header />);
    const mockOnClick = jest.fn();
    const addButton = screen.getByRole("button", { name: /add city/i });
    addButton.addEventListener("click", mockOnClick);
    fireEvent.click(addButton);
    expect(mockOnClick).toBeCalledTimes(1);
  });

  it("Search field value should be '' after add button click", () => {
    renderComponent(<Header />);
    const searchInput = screen.getByPlaceholderText("Search city");
    const addButton = screen.getByRole("button", { name: /add city/i });
    fireEvent.change(searchInput, { target: { value: "Test" } });
    fireEvent.click(addButton);
    expect(searchInput).toHaveValue("");
  });

  it("Fetch city weather dispatch is called after add city button click", async () => {
    renderComponent(<Header />);
    const addButton = screen.getByRole("button", { name: /add city/i });
    const searchInput = screen.getByPlaceholderText("Search city");
    fireEvent.change(searchInput, { target: { value: "Test" } });
    userEvent.click(addButton);
    expect(dispatch).toHaveBeenCalled();
  });
});
