import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import {
  HeaderLogo,
  HeaderWrapper,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./Header.style";
import { useAppDispatch } from "../../store";
import { getCityWeather } from "../../features/slices";
import weatherLogo from "../../assets/images/weatherIcon.png";

export const Header = (): JSX.Element => {
  const [inputCity, setInputCity] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (inputCity) {
      dispatch(getCityWeather(inputCity));
      setInputCity("");
    }
  };

  return (
    <HeaderWrapper>
      <HeaderLogo src={weatherLogo} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search city"
            inputProps={{ "aria-label": "search" }}
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />
        </Search>
        <Button variant="contained" onClick={handleClick}>
          Add city
        </Button>
      </Box>
    </HeaderWrapper>
  );
};
