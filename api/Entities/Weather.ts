import axios from "axios";

import { Weather } from "../Types";

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
