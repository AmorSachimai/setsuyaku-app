import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged } from "firebase/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
      <GestureHandlerRootView>
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
       </GestureHandlerRootView>
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
