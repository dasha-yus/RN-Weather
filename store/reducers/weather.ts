import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WeatherState {
  isDay: boolean;
}

const initialState: WeatherState = {
  isDay: false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setIsDay: (state, action: PayloadAction<{ isDay: boolean }>) => {
      state.isDay = action.payload.isDay;
    },
  },
});

export const { setIsDay } = weatherSlice.actions;

export default weatherSlice.reducer;
