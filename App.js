//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Home2 from "./components2/Home2";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator,} from "@react-navigation/native-stack";
//import { CardStyleInterpolators} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";


export default function App() {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();


  return (
    <NavigationContainer>
      <Tab.Navigator
        // initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#ADD8E6" },
        //   headerTitleStyle: { color: "#fff" },
        //   headerTintColor: "#fff",
        //   headerBackTitle: "Back",
        //   /* 画面遷移のアニメーションを指定することができる */
        //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        //   /* 画面をスワイプすると戻ることができる設定 Android用 iphoneはデフォルトでできる */
        //   gestureEnavled: true,
        //   gestureDirection: "horizontal",
        }}
      >
        <Tab.Screen name="ホーム" component={Home} />
        <Tab.Screen name="あ" component={Home2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
