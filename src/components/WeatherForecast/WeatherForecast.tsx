import { getColorTemperature, temperatureFormatter } from "../../utils";
import { TWeatherForecast } from "./type";
import {
  TemperatureItem,
  TemperatureListWrapper,
} from "./WeatherForecast.style";

export const WeatherForecast = ({
  forecast,
}: TWeatherForecast): JSX.Element => {
  return (
    <TemperatureListWrapper>
      {forecast?.map((forecastTemp, index) => (
        <TemperatureItem
          key={index}
          marginBottom={temperatureFormatter(forecastTemp.main.temp) * 5}
          colorBg={getColorTemperature(
            temperatureFormatter(forecastTemp.main.temp)
          )}
        >
          {temperatureFormatter(forecastTemp.main.temp)}
        </TemperatureItem>
      ))}
    </TemperatureListWrapper>
  );
};
