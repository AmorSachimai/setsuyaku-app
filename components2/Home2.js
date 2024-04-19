//こちらでは今までの月で計上された節約額の合計からギフトを送ったり、
//ご褒美を購入したりすることにより引き算の処理がなされます


import { auth } from "../firebase/Firebase"
import { Header2 } from "./Header2";
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Logout } from "../auth/Logout";


function Home2() {
  
  return (
    <View>
      <View>
        <Header2 />
        <Logout />
      </View>
    </View>
  );
}
export default Home2;
