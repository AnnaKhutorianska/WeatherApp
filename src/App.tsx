import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { Container } from "./App.style";
import { WeatherCardsList, WeatherDetails } from "./pages";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WeatherCardsList />,
  },
  {
    path: "/:cityName",
    element: <WeatherDetails />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </Provider>
  );
}

export default App;
