import { Box, styled } from "@mui/material";

export const WeatherDetailsContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginBottom: "20px",
});

export const TempDetails = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  gap: "1px",
  flexDirection: "column",
});

export const WeatherDetailsSun = styled(Box)({
  display: "flex",
  gap: "5px",
  flexDirection: "column",
  marginBottom: "20px",
});

export const WeatherDetailsSunItem = styled(Box)({
  display: "flex",
  gap: "15px",
  alignItems: "baseline",
});
