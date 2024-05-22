//最後でおけ
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const TotalBuy = ({ getExpense }) => {
const getTotalExpense =() =>
  {
    //totalcalを実装する必要アリよ
    const totalExpense = () => Totalcal().getExpense;
  return totalExpense;
}
  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>使ったお金: {getTotalExpense}円</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    margin: 20,
  },
  totalText: {
    fontSize: 18,
    
    color: "black",
  },
});
