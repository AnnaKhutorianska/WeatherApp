import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ButtonGroup,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

import { temperatureFormatter, timeConverter } from "../../utils";
import { TCityCard } from "./type";
import { useAppDispatch } from "../../store";
import { deleteCity, refetchCityWeather } from "../../features/slices";
import { CardHeader, CardWrapper } from "./CityCard.style";

export const CityCard = ({ id, name, dt, feels_like, temp }: TCityCard) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(deleteCity(id));
  };

  const handleClickRefresh = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(refetchCityWeather(name));
  };

  return (
    <CardWrapper item onClick={() => navigate(`/${name}`)} data-testid="city-card">
      <Card>
        <CardContent>
          <CardHeader>
            <Typography variant={"h6"}>{name}</Typography>
            <Typography variant={"body1"}>Last update: {timeConverter(dt)}</Typography>
          </CardHeader>
          <Divider light />
          <Typography variant={"body1"}>
            Feels like: {temperatureFormatter(feels_like)}&#8451;
          </Typography>
          <Typography variant={"body1"}>
            Temparature: {temperatureFormatter(temp)}&#8451;
          </Typography>
        </CardContent>
        <ButtonGroup>
          <IconButton aria-label="delete" onClick={handleClickDelete} data-testid="delete-btn">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="refresh" onClick={handleClickRefresh} data-testid="refresh-btn">
            <RefreshIcon />
          </IconButton>
        </ButtonGroup>
      </Card>
    </CardWrapper>
  );
};
