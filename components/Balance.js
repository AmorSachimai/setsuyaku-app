import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";


export const Balance = ({ saveTotal }) => {

  const balance = saveTotal;

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