import { Header } from "./Header";
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";



function Home() {
  const [date, setDate] = useState(new Date());


  //for Header
  const setPrevMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth() - 1;
    const day = date.getDate();
    setDate(new Date(year, month, day));
  };

  const setNextMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setDate(new Date(year, month, day));
  };



  return (
    <View>
      <View>
        <Header
          date={date}
          setPrevMonth={setPrevMonth}
          setNextMonth={setNextMonth}
        />
        
      </View>
    </View>
  );
}
export default Home;
