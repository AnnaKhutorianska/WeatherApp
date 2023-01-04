import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";

import { TCityNameParam } from "./type";
import sunset from "../../assets/images/sunset.png";
import sunrise from "../../assets/images/sunrise.png";
import { Image, WeatherForecast } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store";
import { getSelectedCityWeather } from "../../features/slices";
import { temperatureFormatter, timeConverter } from "../../utils";
import { TempDetails, WeatherDetailsContent, WeatherDetailsSun, WeatherDetailsSunItem } from "./WeatherDetails.style";

export const WeatherDetails = (): JSX.Element => {
  const { cityName } = useParams() as TCityNameParam;
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.weather.selectedCity);

  useEffect(() => {
    dispatch(getSelectedCityWeather(cityName));
  }, [cityName]);

  return (
    <Container maxWidth="lg">
      <Typography variant={"h6"} marginBottom={5}>
        {city?.name}, {city?.sys?.country}
      </Typography>
      <WeatherDetailsContent>
        <DeviceThermostatOutlinedIcon color="warning" />
        <TempDetails>
          <Typography variant={"body1"}>
            Temperature: {temperatureFormatter(city?.main?.temp!)}&#8451;
          </Typography>
          <Typography variant={"body1"}>
            Feels like: {temperatureFormatter(city?.main?.feels_like!)}
            &#8451;
          </Typography>
          <Typography variant={"body1"}>
            Min temperature: {temperatureFormatter(city?.main?.temp_min!)}
            &#8451;
          </Typography>
          <Typography variant={"body1"}>
            Max temperature: {temperatureFormatter(city?.main?.temp_max!)}
            &#8451;
          </Typography>
        </TempDetails>
      </WeatherDetailsContent>
      <WeatherDetailsContent>
        <OpacityOutlinedIcon color="primary" />
        <Typography variant={"body1"}>
          Humidity: {temperatureFormatter(city?.main?.humidity!)}%
        </Typography>
      </WeatherDetailsContent>
      <WeatherDetailsSun>
        <WeatherDetailsSunItem>
          <Image src={sunrise} alt="sunrise" width={30} height={30} />
          <Typography variant={"body1"}>
            {timeConverter(city?.sys?.sunrise!)}
          </Typography>
        </WeatherDetailsSunItem>
        <WeatherDetailsSunItem>
          <Image src={sunset} alt="sunset" width={30} height={30} />
          <Typography variant={"body1"}>
            {timeConverter(city?.sys?.sunset!)}
          </Typography>
        </WeatherDetailsSunItem>
      </WeatherDetailsSun>
      <Typography variant={"h6"}>Forecast</Typography>
      <WeatherForecast forecast={city?.forecast?.list} />
    </Container>
  );
};
