import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Balance = ({ saveTotal }) => {

  
  const balance = saveTotal;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>節約額</Text>
      {/* <Text style={styles.title}>今月の節約額</Text> */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>
          {new Intl.NumberFormat().format(balance)}
        </Text>
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
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceText: {
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
