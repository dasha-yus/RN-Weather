import { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import * as Location from "expo-location";
import { useSelector } from "react-redux";

import { getZoneForCountry } from "../utils/Date";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import WeatherHeader from "../components/Weather/Header";
import { WeatherState } from "../store/reducers/weather";

const WeatherScreen = () => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<any>();

  const { isDay } = useSelector(
    (state: { weather: WeatherState }) => state.weather
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        try {
          setLoading(true);
          const currentLocation = await Location.getCurrentPositionAsync({});
          const res = await Location.reverseGeocodeAsync({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          });
          const timezone =
            res?.[0]?.isoCountryCode &&
            getZoneForCountry(res[0].isoCountryCode);

          setLocation({
            lat: currentLocation.coords.latitude,
            lng: currentLocation.coords.longitude,
            city: res?.[0]?.city,
            country: res?.[0]?.country,
            iso2: res?.[0]?.isoCountryCode,
            tz: timezone,
          });
        } catch (err) {
        } finally {
          setLoading(false);
        }
      }
    })();
  }, []);

  if (loading) {
    return <LoadingOverlay message="Loading weather forecast" />;
  }

  return (
    <ImageBackground
      source={
        isDay
          ? require("../assets/images/bg-day.jpg")
          : require("../assets/images/bg-night.jpg")
      }
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.wrapper}>
        <View style={styles.block}>
          <WeatherHeader location={location} />
        </View>
        <View style={styles.block}></View>
      </View>
    </ImageBackground>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  wrapper: {
    justifyContent: "space-between",
  },
  block: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});
