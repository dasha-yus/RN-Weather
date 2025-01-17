import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import AppText from "../UI/AppText";
import { Location, Weather } from "../../api/Types";
import { getCurrentWeather } from "../../api/Entities/Weather";
import { setIsDay, WeatherState } from "../../store/reducers/weather";
import { AppDispatch } from "../../store";

interface WeatherHeaderProps {
  location: Location;
  isExpanded: boolean;
  onWeatherChanged: (weather: Weather) => void;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({
  location,
  isExpanded,
  onWeatherChanged,
}) => {
  const [currentWather, setCurrentWeather] = useState<Weather>();
  const dispatch: AppDispatch = useDispatch();
  const { isDay } = useSelector(
    (state: { weather: WeatherState }) => state.weather
  );

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
      onWeatherChanged(weather);
    } catch (error) {
      //   console.log("error", error);
    }
  };

  return (
    <View style={[styles.header, { marginTop: isExpanded ? 0 : 40 }]}>
      <AppText
        style={[
          {
            color: isDay ? "#000" : "#fff",
            fontSize: isExpanded ? 26 : 42,
          },
        ]}
      >
        {location?.city}
      </AppText>
      {currentWather && (
        <>
          <AppText
            style={[
              styles.degrees,
              {
                color: isDay ? "#000" : "#fff",
                fontSize: isExpanded ? 64 : 100,
              },
            ]}
          >
            {Math.round(currentWather?.temp_c)}&#8451;
          </AppText>
          <AppText
            style={{
              color: isDay ? "#000" : "#fff",
              fontSize: isExpanded ? 20 : 24,
            }}
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
  },
  degrees: {
    fontFamily: "open-sans-bold",
  },
});
