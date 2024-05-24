import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
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

const confirmLogout = () => {
  Alert.alert(
    "ログアウトの確認",
    "本当にログアウトしますか？",
    [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: handleLogout,
      },
    ],
    { cancelable: false }
  );
};

export const Logout = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={confirmLogout} style={styles.button}>
        <Text style={styles.text}>ログアウト</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    marginTop: 20,
    paddingRight: 10, // 右側にパディングを追加
  },
  buttonContainer: {
    flexDirection: "row", // アイテムを水平に整列
  },
  button: {
    backgroundColor: "#ADD8E6", // ライトブルーの背景色
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "#fff", // 白色のテキスト
    fontSize: 16,
  },
});

export default Logout;
