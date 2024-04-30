//ひもづけられてない

import React, { useState } from "react";
import {
  Alert,
  Button,
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import Dialog from "react-native-dialog";

export const BuyGohoubi  = ({
  
  addExpense,
  expenseItems,
  setInputText,
  inputAmount,
  setInputAmount,
  selectedMonth,
  thisMonth,
}) => {
  const [visible, setVisible] = useState(false);
  const [price, setPrice] = useState("");
  const [thing, setThing] = useState("");
  const [total, setTotal] = useState(0);

  const handleBuy = () => {
    if (price.trim() === "") {
      Alert.alert("エラー", "値段を入力してください。");
      return;
    }
    // const newPrice = parseFloat(price);
    // setTotal(total + newPrice);
    // expenseItems.amount = total;
    //個人のアカウントにご褒美額をひもづけ
    setPrice("");
    setThing("");
    setVisible(false);
    console.log("Saved", { price,thing });
  };

  const handleCloseDialog = () => {
    setPrice("");
    setVisible(false);
  };



  const reset = () => {
    setInputText("");
    setInputAmount("");
  };

  return (
    <View>
      <Dialog.Container visible={visible} onBackdropPress={handleCloseDialog}>
        <Dialog.Title style={styles.dialogTitle}>ご褒美を買う</Dialog.Title>
        <TextInput
          style={styles.input}
          placeholder="値段"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
          underlineColorAndroid="transparent" // Hide underline on Android
          // onchange={handleBuy}
        />
        <TextInput
          style={styles.input}
          placeholder="何を買ったの？"
          placeholderTextColor="#999"
          keyboardType="default"
          value={thing}
          onChangeText={setThing}
          underlineColorAndroid="transparent" // Hide underline on Android
          // onchange={handleBuy}
        />
        <Dialog.Button
          label="キャンセル"
          color="red"
          onPress={handleCloseDialog}
        />
        <Dialog.Button
          label="買う"
          
          
          onPress={
            () => {
              addExpense(thing, price);
              handleBuy();
            }
            
          }
        />
      </Dialog.Container>

      {/* <Text style={styles.totalText}>{total}円</Text> */}

      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => setVisible(true)}
      >
        <Button
          title="ご褒美を買う"
          style={styles.buyButtonText}
          onPress={() => setVisible(true)}
        />
      </TouchableOpacity>
    </View>
  );
};

// export default {total};

const styles = StyleSheet.create({


  dialogTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    //borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: "#FFFFFF",
  },
  totalText: {
    marginTop: 50,
    fontSize: 35,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },

  buyButton: {
    marginTop: 100,
    marginLeft: 100,
    marginRight: 200,
    backgroundColor: "lightblue",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  buyButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
