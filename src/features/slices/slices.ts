import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TWeatherByCity } from "../../types";
import {
  TWeatherByCityRequest,
  TWeatherForecastRequest,
  WeatherCityState,
} from "./type";

const getWeatherByCityRequest = async (cityName: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=bc5857ad143d41697cb6b968db8f7fa9&units=metric`
  );
  const data = await response.json();

  if (data.cod && data.message) throw data.message;

  return data as TWeatherByCityRequest;
};

const getWeatherForecastByCityRequest = async (cityName: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=24&appid=bc5857ad143d41697cb6b968db8f7fa9&units=metric`
  );
  return (await response.json()) as TWeatherForecastRequest;
};

export const getCityWeather = createAsyncThunk(
  "weather/getCityWeather",
  getWeatherByCityRequest
);

export const getCityListWeather = createAsyncThunk(
  "weather/getCityListWeather",
  (cityNames: string[]) => Promise.all(cityNames.map(getWeatherByCityRequest))
);

export const refetchCityWeather = createAsyncThunk(
  "weather/refetchCityWeather",
  getWeatherByCityRequest
);

export const getSelectedCityWeather = createAsyncThunk(
  "weather/getSelectedCityWeather",
  (cityName: string) =>
    Promise.all([
      getWeatherByCityRequest(cityName),
      getWeatherForecastByCityRequest(cityName),
    ])
);

const initialState = {
  error: undefined,
  cityList: [],
  selectedCity: undefined,
} as WeatherCityState;

const cityWeatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    deleteCity(state, action: PayloadAction<number>) {
      const filteredCityList = state?.cityList?.filter(
        (city) => String(city.id) !== String(action.payload)
      );
      localStorage.setItem(
        "cities",
        JSON.stringify(filteredCityList?.map((city) => city.name))
      );
      state.cityList = filteredCityList;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        getCityWeather.fulfilled,
        (state, action: PayloadAction<TWeatherByCity>) => {
          const isCityAdded = state?.cityList?.some(
            (city) => String(city.id) === String(action.payload.id)
          );
          const cityList = isCityAdded
            ? state.cityList
            : [...state.cityList, action.payload];

          state.error = isCityAdded ? "City is already added" : undefined;
          state.cityList = cityList;
          localStorage.setItem(
            "cities",
            JSON.stringify(cityList?.map((city) => city.name))
          );
        }
      )
      .addCase(getCityWeather.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(
        getCityListWeather.fulfilled,
        (state, action: PayloadAction<TWeatherByCityRequest[]>) => {
          state.cityList = action.payload;
        }
      )
      .addCase(
        refetchCityWeather.fulfilled,
        (state, action: PayloadAction<TWeatherByCityRequest>) => {
          state.cityList = state.cityList?.map((city) => {
            if (city.id === action.payload.id) {
              return action.payload;
            }

            return city;
          });
        }
      )
      .addCase(
        getSelectedCityWeather.fulfilled,
        (
          state,
          action: PayloadAction<
            [TWeatherByCityRequest, TWeatherForecastRequest]
          >
        ) => {
          const [currentWeather, forecast] = action.payload;
          state.selectedCity = { ...currentWeather, forecast };
          state.error = undefined;
        }
      );
  },
});

export const { deleteCity } = cityWeatherSlice.actions;

export default cityWeatherSlice.reducer;
