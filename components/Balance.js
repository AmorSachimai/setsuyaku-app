import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";


export const Balance = ({ incomeTotal, expenseItems }) => {
  const expenseAmounts = expenseItems.map((expenseItem) => expenseItem.amount);

  const expenseTotal = expenseAmounts.reduce((acc, cur) => (acc += cur), 0);

  const balance = incomeTotal - expenseTotal;

  return (
    <View>
      <Text>残高</Text>
      <View>
        {Number(balance).toLocaleString()}
        <Text> 円</Text>
      </View>
    </View>
  );
};
//