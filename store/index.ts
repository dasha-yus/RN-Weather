import { configureStore } from "@reduxjs/toolkit";

import weatherReducer from "./reducers/weather";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
