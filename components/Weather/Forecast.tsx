import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ForecastDay, Location } from "../../api/Types";
import { getDayForecast } from "../../api/Entities/Weather";
import ForecastItem from "./ForecastItem";
import Colors from "../../constants/colors";

interface ForecastProps {
  location: Location;
  onExpanded: (isExpanded: boolean) => void;
}

const Forecast: React.FC<ForecastProps> = ({ location, onExpanded }) => {
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
        <ScrollView horizontal>
          {forecast.hour.map((hour) => (
            <ForecastItem hour={hour} key={hour.time} />
          ))}
        </ScrollView>
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
});
