import axios from "axios";

import { ForecastDay, Weather } from "../Types";

const AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_WEATHER_API_BASE_URL,
  params: { key: process.env.EXPO_PUBLIC_WEATHER_API_KEY, aqi: "no" },
});

export const getCurrentWeather = async (city: string): Promise<Weather> => {
  const res = await AxiosInstance.get("/current.json", {
    params: {
      q: city,
    },
  });
  return res.data?.current;
};

export const getDayForecast = async (city: string): Promise<ForecastDay> => {
  const res = await AxiosInstance.get("/forecast.json", {
    params: {
      q: city,
      days: 2,
      alerts: "no",
    },
  });
  return res.data?.forecast?.forecastday?.[0];
};
