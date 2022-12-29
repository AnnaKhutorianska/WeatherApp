import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const getWeatherByCityRequest = async (cityName: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=bc5857ad143d41697cb6b968db8f7fa9&units=metric`
  );
  return (await response.json()) as any;
};

export const getCityWeather = createAsyncThunk(
  "weather/getCityWeather",
  getWeatherByCityRequest
);

export const getCityListWeather = createAsyncThunk(
  "weather/getCityListWeather",
  async (cityNames: string[]) =>
    Promise.all(cityNames.map(getWeatherByCityRequest))
);

interface PostState {
  loading: boolean;
  error: string | null;
  data: any[] | null; // delete
  cityList: any[];
}

const initialState = {
  loading: false,
  error: null,
  data: null, // delete
  cityList: [],
} as PostState;

const cityWeatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCityWeather.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getCityWeather.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          const cityList = [...state.cityList, action.payload];
          state.loading = false;
          state.cityList = cityList;
          localStorage.setItem(
            "cities",
            JSON.stringify(cityList.map((city) => city.name))
          );
        }
      )
      .addCase(getCityWeather.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(getCityListWeather.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getCityListWeather.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.cityList = action.payload;
        }
      )
      .addCase(
        getCityListWeather.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      );
  },
});

export default cityWeatherSlice.reducer;
