import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { temperatureFormatter, timeConverter } from "../../utils";
import { TCityCard } from "./type";

export const CityCard = ({ id, name, dt, feels_like, temp }: TCityCard) => {
  return (
    <Grid item onClick={() => {}}>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Typography variant={"h6"}>
              {name}
            </Typography>
            <Typography variant={"body1"}>{timeConverter(dt)}</Typography>
          </Box>
          <Divider light />
          {/* <Box sx={{ display: "flex", alignItems: "center", gap: 10 }}> */}
            <Typography variant={"body1"}>
              Feels like: {temperatureFormatter(feels_like)}&#8451;
            </Typography>
            <Typography variant={"body1"}>
              Temparature: {temperatureFormatter(temp)}&#8451;
            </Typography>
          {/* </Box> */}
        </CardContent>
      </Card>
    </Grid>
  );
};
