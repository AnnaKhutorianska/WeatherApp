import { TWeatherByCity, TWeatherForecast } from "../../types";

export type TWeatherByCityRequest = TWeatherByCity;
export type TWeatherForecastRequest = TWeatherForecast;
export type TWeatherBySelectedCity = TWeatherByCity & {
  forecast: TWeatherForecast;
};

export type WeatherCityState =  {
  error: string | undefined;
  cityList: TWeatherByCity[] | [];
  selectedCity: TWeatherBySelectedCity | undefined;
}