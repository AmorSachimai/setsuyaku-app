import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../firebase/Firebase";
import { signOut } from "firebase/auth";

const handleLogout = () => {
  signOut(auth)
    .then(() => {
      console.log("logout");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const Logout = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.text}>ログアウト</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    marginTop: 20,
    paddingRight: 10, // Add some padding to the right side
  },
  buttonContainer: {
    flexDirection: "row", // Align items horizontally
  },
  button: {
    backgroundColor: "#ADD8E6", // Light blue color
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "#fff", // White text color
    fontSize: 16,
  },
});

export default Logout;
