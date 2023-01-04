import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { render as rtlRender } from "@testing-library/react";
import { rootReducer } from "../store/store";

interface WrapperProps {
  children?: React.ReactNode;
}

export const renderComponent = (
  ui: React.ReactElement,
  { initialState = {} } = {}
) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
  const Wrapper = ({ children }: WrapperProps) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/", "/:cityName"]}>
          {children}
        </MemoryRouter>
      </Provider>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper });
};
