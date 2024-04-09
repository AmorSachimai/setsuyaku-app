import { View, Button, Text, StyleSheet } from "react-native";
//aaaaaaaaa


export const Header = ({ date, setPrevMonth, setNextMonth }) => {



  const today = date;
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  return (
    <View>
      <View>
        <Button onPress={() => setPrevMonth()} title="←前月"></Button>
        <Text>
          {year}年{month}月
        </Text>
        <Button onPress={() => setNextMonth()} title="次月→"></Button>
      </View>
    </View>
  );


};
  
