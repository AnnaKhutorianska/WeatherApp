import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import {
  ButtonAdd,
  HeaderContainer,
  HeaderBackground,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  SearchFieldWrapper,
} from "./Header.style";
import { useAppDispatch } from "../../store";
import { getCityWeather } from "../../features/slices";
import { Image } from "../commonComponents/Image";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputCity(e.target.value);
  };

  return (
    <HeaderBackground data-testid="header">
      <HeaderContainer maxWidth="lg">
        <Image src={weatherLogo} alt="weatherLogo" width={50} height={50} />
        <SearchFieldWrapper>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              data-testid="search-by-city"
              placeholder="Search city"
              inputProps={{ "aria-label": "search" }}
              value={inputCity}
              onChange={handleChange}
            />
          </Search>
          <ButtonAdd size="small" variant="outlined" onClick={handleClick}>
            Add city
          </ButtonAdd>
        </SearchFieldWrapper>
      </HeaderContainer>
    </HeaderBackground>
  );
};
