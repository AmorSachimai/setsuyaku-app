import { View, Button, Text, StyleSheet } from "react-native";



export const Header = ({ date, setPrevMonth, setNextMonth }) => {
  const today = date;
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button onPress={() => setPrevMonth()} title="←前月"></Button>
        <Text style={styles.title}>
          {year}年{month}月
        </Text>
        <Button onPress={() => setNextMonth()} title="次月→"></Button>
      </View>
    </View>
  );


};
    const styles = StyleSheet.create({
      container: {
        backgroundColor: "lightblue",
        padding: 10,
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
      },
    });


    export default Header;