import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import AppText from "../UI/AppText";
import { Location, Weather } from "../../api/Types";
import { getCurrentWeather } from "../../api/Entities/Weather";
import { setIsDay } from "../../store/reducers/weather";
import { AppDispatch } from "../../store";

interface WeatherHeaderProps {
  location: Location;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({ location }) => {
  const [currentWather, setCurrentWeather] = useState<Weather>();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!location) {
      return;
    }
    getWeatherData();
  }, [location]);

  const getWeatherData = async () => {
    try {
      const weather: Weather = await getCurrentWeather(location.city);
      dispatch(setIsDay({ isDay: !!weather.is_day }));
      setCurrentWeather(weather);
    } catch (error) {
      //   console.log("error", error);
    }
  };

  return (
    <View style={styles.header}>
      <AppText
        style={[
          styles.city,
          { color: currentWather?.is_day ? "#000" : "#fff" },
        ]}
      >
        {location?.city}
      </AppText>
      {currentWather && (
        <>
          <AppText
            style={[
              styles.degrees,
              { color: currentWather.is_day ? "#000" : "#fff" },
            ]}
          >
            {Math.round(currentWather?.temp_c)}&#8451;
          </AppText>
          <AppText
            style={[
              styles.weather,
              { color: currentWather.is_day ? "#000" : "#fff" },
            ]}
          >
            {currentWather.condition.text}
          </AppText>
        </>
      )}
    </View>
  );
};

export default WeatherHeader;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  city: {
    fontSize: 42,
  },
  degrees: {
    fontSize: 100,
    fontFamily: "open-sans-bold",
  },
  weather: {
    fontSize: 24,
  },
});
