import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons, Feather, FontAwesome6 } from "@expo/vector-icons";

import { ForecastDay, Location, Weather } from "../../api/Types";
import { getDayForecast } from "../../api/Entities/Weather";
import ForecastItem from "./ForecastItem";
import Colors from "../../constants/colors";
import Widget from "../UI/Widget";
import AppText from "../UI/AppText";

interface ForecastProps {
  location: Location;
  onExpanded: (isExpanded: boolean) => void;
  weather?: Weather;
}

const Forecast: React.FC<ForecastProps> = ({
  location,
  weather,
  onExpanded,
}) => {
  const [forecast, setForecast] = useState<ForecastDay>({ hour: [] });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!location) {
      return;
    }
    getWeatherData();
  }, [location]);

  const getWeatherData = async () => {
    try {
      const forecastData: ForecastDay = await getDayForecast(location.city);
      const now = new Date();
      const filteredHours = forecastData.hour.filter(
        (h) => new Date(h.time).getTime() > now.getTime()
      );
      setForecast({ hour: filteredHours.slice(0, 12) });
    } catch (error) {
      //   console.log("error", error);
    }
  };

  const expandHandler = () => {
    setIsExpanded(!isExpanded);
    onExpanded(!isExpanded);
  };

  return (
    <View style={[styles.container, { height: isExpanded ? 900 : 400 }]}>
      <View style={styles.forecast}>
        <Pressable
          onPress={expandHandler}
          style={({ pressed }) => [pressed && styles.pressed]}
        >
          <View style={styles.swipeArea}>
            <Ionicons
              name={isExpanded ? "chevron-down" : "chevron-up"}
              size={40}
              color={Colors.gray200}
            />
          </View>
        </Pressable>
        <View style={styles.wrapper}>
          <ScrollView horizontal>
            {forecast.hour.map((hour) => (
              <ForecastItem hour={hour} key={hour.time} />
            ))}
          </ScrollView>
        </View>
        {isExpanded && weather ? (
          <View style={styles.widgetsWrapper}>
            <View style={styles.widgets}>
              <Widget
                title="Feels like"
                icon={
                  <FontAwesome6
                    name="temperature-low"
                    size={16}
                    color={Colors.gray100}
                  />
                }
                value={Math.round(weather.feelslike_c)}
                unit="°C"
              />
              <Widget
                title="Humidity"
                icon={
                  <Ionicons
                    name="water-outline"
                    size={16}
                    color={Colors.gray100}
                  />
                }
                value={weather.humidity}
                unit="%"
              />
            </View>
            <View style={styles.widgets}>
              <Widget
                title="Wind"
                icon={<Feather name="wind" size={16} color={Colors.gray100} />}
                value={Number((weather.wind_kph / 3.6).toFixed(1))}
                unit="m/s"
              />
              <Widget
                title="Air pressure"
                icon={
                  <FontAwesome6
                    name="arrows-down-to-line"
                    size={16}
                    color={Colors.gray100}
                  />
                }
                value={weather.pressure_mb * 0.75}
                unit="psi"
              />
            </View>
          </View>
        ) : (
          <AppText style={styles.hint}>Expand to see more details</AppText>
        )}
      </View>
    </View>
  );
};

export default Forecast;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: "50%",
  },
  swipeArea: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  forecast: {
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 12,
  },
  pressed: {
    opacity: 0.5,
  },
  wrapper: {
    height: 150,
  },
  hint: {
    fontSize: 16,
    marginTop: 40,
  },
  widgetsWrapper: {
    marginTop: 12,
    width: "100%",
  },
  widgets: {
    flexDirection: "row",
  },
});
