import React from "react";
import { Grid } from "@mui/material";
import { useAppSelector } from "../../store";
import { CityCard } from "../CityCard";

export const CityCardList = () => {
  const cities = useAppSelector((state) => state.weather.cityList);
  console.log("user", cities[0]);

  return (
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
  );
};
