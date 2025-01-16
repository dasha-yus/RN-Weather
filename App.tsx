import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Provider, useSelector } from "react-redux";

import WeatherScreen from "./screens/Weather";
import { store } from "./store";
import { WeatherState } from "./store/reducers/weather";

function Root() {
  const { isDay } = useSelector(
    (state: { weather: WeatherState }) => state.weather
  );

  return (
    <View style={styles.container}>
      <StatusBar style={isDay ? "dark" : "light"} />
      <WeatherScreen />
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
