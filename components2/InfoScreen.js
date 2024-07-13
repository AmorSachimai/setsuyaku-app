// InfoScreen.js
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const InfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>アプリ情報</Text>
      <Text style={styles.text}>このアプリの作成者やバージョン情報をここに記載します。</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default InfoScreen;
