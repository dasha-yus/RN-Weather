import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "./AppText";
import Colors from "../../constants/colors";

interface WidgetProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  unit: string;
}

const Widget: React.FC<WidgetProps> = ({ title, icon, value, unit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.title}>{title.toUpperCase()}</AppText>
        {icon}
      </View>
      <View style={styles.value}>
        <AppText style={styles.valueText}>
          {`${value}${unit}`}
        </AppText>
      </View>
    </View>
  );
};

export default Widget;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 150,
    padding: 12,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: Colors.gray200,
    borderWidth: 1,
    borderRadius: 14,
    flex: 1,
    margin: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    height: 20,
  },
  title: {
    fontSize: 14,
    color: Colors.gray100,
  },
  value: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 20,
  },
  valueText: {
    fontSize: 40,
  },
});
