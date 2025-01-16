import React from "react";
import { Text, StyleSheet } from "react-native";

interface AppTextProps {
  children: React.ReactNode;
  style: object;
}

const AppText: React.FC<AppTextProps> = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
});
