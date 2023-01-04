import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import cityWeatherSlice from "../features/slices/slices";
import { AppDispatch, RootState } from "./type";

export const rootReducer = combineReducers({
  weather: cityWeatherSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: undefined,
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
