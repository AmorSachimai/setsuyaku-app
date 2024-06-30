import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "./firebase/Firebase";
import Home from "./components/Home";
import Home2 from "./components2/Home2";
import Login from "./auth/Login";
import Register from "./auth/Register";

const auth = getAuth(app);

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        setUser("");
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen name="Authenticated" options={{ headerShown: false }}>
              {() => (
                <Tab.Navigator
                  screenOptions={{
                    headerStyle: { backgroundColor: "#ADD8E6" },
                  }}
                >
                  <Tab.Screen name="ためる" component={Home} />
                  <Tab.Screen name="ごほうび" component={Home2} />
                </Tab.Navigator>
              )}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="ログイン" component={Login} />
              <Stack.Screen name="登録" component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 20,
    color: "#555",
  },
});

// //import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// //import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Home from "./components/Home";
// import Home2 from "./components2/Home2";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator,} from "@react-navigation/native-stack";
// //import { CardStyleInterpolators} from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import * as React from "react";

// export default function App() {

//   const Stack = createNativeStackNavigator();
//   const Tab = createBottomTabNavigator();

//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         // initialRouteName="Home"
//         screenOptions={{
//           headerStyle: { backgroundColor: "#ADD8E6" },
//         //   headerTitleStyle: { color: "#fff" },
//         //   headerTintColor: "#fff",
//         //   headerBackTitle: "Back",
//         //   /* 画面遷移のアニメーションを指定することができる */
//         //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//         //   /* 画面をスワイプすると戻ることができる設定 Android用 iphoneはデフォルトでできる */
//         //   gestureEnavled: true,
//         //   gestureDirection: "horizontal",
//         }}
//       >
//         <Tab.Screen name="ホーム" component={Home} />
//         <Tab.Screen name="あ" component={Home2} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
