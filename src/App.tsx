import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from "./store";
import { WeatherCardsList, WeatherDetails } from "./pages";

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

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
