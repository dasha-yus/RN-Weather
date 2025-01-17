import React from "react";
import { Image, StyleSheet, View } from "react-native";

import AppText from "../UI/AppText";
import { Forecast } from "../../api/Types";
import Colors from "../../constants/colors";

interface ForecastItemProps {
  hour: Forecast;
}

const ForecastItem: React.FC<ForecastItemProps> = ({ hour }) => {
  return (
    <View style={styles.container} key={hour.time}>
      <AppText style={styles.time}>
        {new Date(hour.time).toLocaleString("en-US", {
          hour: "numeric",
          hour12: true,
        })}
      </AppText>
      <Image
        style={styles.image}
        source={{ uri: `https:${hour.condition.icon}` }}
      />
      <AppText style={styles.temperature}>
        {Math.round(hour.temp_c)}&#8451;
      </AppText>
    </View>
  );
};

export default ForecastItem;

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 80,
    borderRadius: 14,
    marginHorizontal: 6,
    padding: 12,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "space-between",
    borderColor: Colors.gray200,
    borderWidth: 1
  },
  time: {
    fontSize: 18,
  },
  image: {
    width: "100%",
    height: 60,
    marginVertical: 6,
  },
  temperature: {
    fontSize: 20,
  },
});
