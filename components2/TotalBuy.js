import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const TotalBuy = ({ totalExpense }) => {
  const formattedTotalExpense = new Intl.NumberFormat().format(totalExpense);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>使ったお金</Text>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>{formattedTotalExpense}</Text>
        <Text style={styles.currency}>円</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    fontFamily: "Arial",
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalText: {
    fontSize: 32,
    marginRight: 5,
    color: "#007bff",
    fontFamily: "Arial",
  },
  currency: {
    fontSize: 24,
    color: "#333",
    fontFamily: "Arial",
  },
});

export default TotalBuy;
