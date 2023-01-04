import { Box, Grid, styled } from "@mui/material";

export const CardHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

export const CardWrapper = styled(Grid)({
  cursor: 'pointer'
});
