import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { auth } from "../firebase";

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.title}>ログイン画面</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ログイン</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("登録")}>
        <Text style={styles.registerLink}>登録はこちら</Text>
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
    width: 250,
    borderWidth: 1,
    borderRadius: 20, // 丸みを帯びた枠線
    padding: 10,
    borderColor: "#87ceeb", // スカイブルー
    backgroundColor: "#fff", // ホワイト
  },
  button: {
    padding: 10,
    backgroundColor: "#87ceeb", // スカイブルー
    borderRadius: 10, // 丸みを帯びたボタン
  },
  buttonText: {
    color: "#fff", // ホワイト
  },
  registerLink: {
    marginTop: 10,
    color: "#4682b4", // ダークスレートブルー
    textDecorationLine: "underline", // 下線を追加
  },
});

export default Login;
