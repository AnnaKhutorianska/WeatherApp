import { useEffect } from "react";
import { Container, Grid } from "@mui/material";

import { CityCard } from "../CityCard";
import { ErrorMessage } from "../ErrorMessage";
import { useAppDispatch, useAppSelector } from "../../store";
import { getCityListWeather } from "../../features/slices";

export const CityCardList = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state) => state.weather?.cityList);
  const error = useAppSelector((state) => state.weather?.error);

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem("cities")!);

    if (value?.length) {
      dispatch(getCityListWeather(value));
      return;
    }

    localStorage.setItem(
      "cities",
      JSON.stringify(["Kyiv", "Riga", "London", "Alaska"])
    );
  }, []);

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
