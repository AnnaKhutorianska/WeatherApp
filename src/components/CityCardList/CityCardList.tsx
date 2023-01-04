import { useEffect } from "react";
import { Container, Grid } from "@mui/material";

import { CityCard } from "../CityCard";
import { ErrorMessage } from "../ErrorMessage";
import { useAppDispatch, useAppSelector } from "../../store";
import { getCityListWeather } from "../../features/slices";

const initialCities: string[] = ["Kyiv", "Riga", "London", "Alaska"];

export const CityCardList = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state) => state.weather?.cityList);
  const error = useAppSelector((state) => state.weather?.error);

  useEffect(() => {
    prepareCitiesState();
  }, []);

  function prepareCitiesState() {
    const value = JSON.parse(localStorage.getItem("cities")!);

  
    console.log('value', value, value?.length);
  
    if (value?.length) {
      dispatch(getCityListWeather(value));
      return;
    }

    console.log('initialCities', initialCities);

    localStorage.setItem("cities", JSON.stringify(initialCities));
    dispatch(getCityListWeather(initialCities));
  }

  return (
    <Container maxWidth="lg" data-testid="city-card-list">
      <Grid container spacing={5}>
        {cities?.map((city) => {
          const {
            id,
            name,
            dt,
            main: { feels_like, temp },
          } = city;
          return (
            <CityCard
              key={id}
              id={id}
              name={name}
              dt={dt}
              feels_like={feels_like}
              temp={temp}
            />
          );
        })}
      </Grid>
      <ErrorMessage error={error} />
    </Container>
  );
};
