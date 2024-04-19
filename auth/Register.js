import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/Firebase";




const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleRegister = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
  };


  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.title}>ユーザ登録画面</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="メールアドレスを入力してください"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="パスワードを入力してください"
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleRegister}
        disabled={!email || !password}
      >
        <Text style={styles.buttonText}>登録する</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f0f8ff", // 淡い水色ベース
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: "#4682b4", // ダークスレートブルー
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: 300, // 入力欄の幅を広く
    height: 40, // 入力欄の高さを増やす
    borderWidth: 1,
    borderRadius: 20, // 丸みを帯びた枠線
    padding: 10,
    borderColor: "#87ceeb", // スカイブルー
    backgroundColor: "#fff", // ホワイト
  },
  button: {
    padding: 10,
    backgroundColor: "#87ceeb", // スカイブルー
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff", // ホワイト
  },
});

export default Register;
