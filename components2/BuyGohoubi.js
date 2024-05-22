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

export const BuyGohoubi = ({
  addExpense,
  expenseItems,
  setInputText,
  inputAmount,
  setInputAmount,
  selectedMonth,
  thisMonth,
}) => {
  const [price, setPrice] = useState("");
  const [thing, setThing] = useState("");
  const [total, setTotal] = useState(0);

  const handleBuy = () => {
    if (price.trim() === "") {
      Alert.alert("エラー", "値段を入力してください。");
      return;
    }

    // Convert price to a number and update total
    const newPrice = parseFloat(price);
    setTotal(total + newPrice);

    // Call addExpense function to add the expense
    addExpense(thing, price);

    // Reset input fields
    setPrice("");
    setThing("");
    console.log("Saved", { price, thing });
  };

  const reset = () => {
    setInputText("");
    setInputAmount("");
  };

  const thisMonthForm = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.dialogTitle}>ご褒美を買う</Text>
        <TextInput
          style={styles.input}
          placeholder="値段"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
          underlineColorAndroid="transparent" // Hide underline on Android
        />
        <TextInput
          style={styles.input}
          placeholder="何を買ったの？"
          placeholderTextColor="#999"
          keyboardType="default"
          value={thing}
          onChangeText={setThing}
          underlineColorAndroid="transparent" // Hide underline on Android
        />
        <View style={styles.buttonContainer}>
          <Button title="キャンセル" color="red" onPress={reset} />
          <Button title="買う" onPress={handleBuy} />
        </View>
        {/* <Text style={styles.totalText}>{total}円</Text> */}
      </View>
    );
  };
  const otherMonthForm = () => {
    return <View></View>;
  };

  return (
    <View>
      {thisMonth === selectedMonth ? thisMonthForm() : otherMonthForm()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  dialogTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    marginTop: 50,
    fontSize: 35,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default BuyGohoubi;

// //ひもづけられてない

// import React, { useState } from "react";
// import {
//   Alert,
//   Button,
//   View,
//   StyleSheet,
//   TextInput,
//   Text,
//   TouchableOpacity,
// } from "react-native";
// import Dialog from "react-native-dialog";

// export const BuyGohoubi  = ({

//   addExpense,
//   expenseItems,
//   setInputText,
//   inputAmount,
//   setInputAmount,
//   selectedMonth,
//   thisMonth,
// }) => {
//   const [visible, setVisible] = useState(false);
//   const [price, setPrice] = useState("");
//   const [thing, setThing] = useState("");
//   const [total, setTotal] = useState(0);

//   const handleBuy = () => {
//     if (price.trim() === "") {
//       Alert.alert("エラー", "値段を入力してください。");
//       return;
//     }
//     // const newPrice = parseFloat(price);
//     // setTotal(total + newPrice);
//     // expenseItems.amount = total;
//     //個人のアカウントにご褒美額をひもづけ
//     setPrice("");
//     setThing("");
//     setVisible(false);
//     console.log("Saved", { price,thing });
//   };

//   const handleCloseDialog = () => {
//     // setPrice("");
//     // setThing("");
//     setVisible(false);
//   };

//   const reset = () => {
//     setInputText("");
//     setInputAmount("");
//   };

//   return (
//     <View>
//       <Dialog.Container visible={visible} onBackdropPress={handleCloseDialog}>
//         <Dialog.Title style={styles.dialogTitle}>ご褒美を買う</Dialog.Title>
//         <TextInput
//           style={styles.input}
//           placeholder="値段"
//           placeholderTextColor="#999"
//           keyboardType="numeric"
//           value={price}
//           onChangeText={setPrice}
//           underlineColorAndroid="transparent" // Hide underline on Android
//           // onchange={handleBuy}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="何を買ったの？"
//           placeholderTextColor="#999"
//           keyboardType="default"
//           value={thing}
//           onChangeText={setThing}
//           underlineColorAndroid="transparent" // Hide underline on Android
//           // onchange={handleBuy}
//         />
//         <Dialog.Button
//           label="キャンセル"
//           color="red"
//           onPress={handleCloseDialog}
//         />
//         <Dialog.Button
//           label="買う"

//           onPress={
//             () => {
//               addExpense(thing, price);
//               handleBuy();
//             }

//           }
//         />
//       </Dialog.Container>

//       {/* <Text style={styles.totalText}>{total}円</Text> */}

//       <TouchableOpacity
//         style={styles.buyButton}
//         onPress={() => setVisible(true)}
//       >
//         <Button
//           title="ご褒美を買う"
//           style={styles.buyButtonText}
//           onPress={() => setVisible(true)}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// // export default {total};

// const styles = StyleSheet.create({

//   dialogTitle: {
//     fontSize: 20,
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     borderWidth: 1,
//     //borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//     color: "#FFFFFF",
//   },
//   totalText: {
//     marginTop: 50,
//     fontSize: 35,
//     fontWeight: "bold",
//     color: "#333",
//     textAlign: "center",
//   },

//   buyButton: {
//     marginTop: 100,
//     marginLeft: 100,
//     marginRight: 200,
//     backgroundColor: "lightblue",
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//     borderRadius: 15,
//   },
//   buyButtonText: {
//     color: "#000000",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });
// // import React, { useState } from "react";
// // import { StyleSheet, TextInput, View, Button, Keyboard } from "react-native";

// // function AddSavingForm() {
// //   const [date, setDate] = useState("");
// //   const [name, setName] = useState("");
// //   const [amount, setAmount] = useState("");

// //   const handleSubmit = () => {
// //     console.log("Saved", { date, name, amount });
// //     setDate("");
// //     setName("");
// //     setAmount("");
// //     Keyboard.dismiss();
// //   };

// //   return (
// //     <View style={styles.formContainer}>
// //       <View style={styles.inputRow}>
// //         <TextInput
// //           style={[styles.input, { flex: 2 }]}
// //           value={date}
// //           placeholder="日付 (YYYY-MM-DD)"
// //           onChangeText={setDate}
// //         />
// //         <TextInput
// //           style={[styles.input, { flex: 3 }]}
// //           value={name}
// //           placeholder="名目"
// //           onChangeText={setName}
// //         />
// //         <TextInput
// //           style={[styles.input, { flex: 2 }]}
// //           value={amount}
// //           placeholder="金額"
// //           keyboardType="numeric"
// //           onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ""))}
// //         />
// //       </View>
// //       <View style={styles.buttonContainer}>
// //         <Button title="セツヤク！" onPress={handleSubmit} color="#007BFF" />
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   formContainer: {
// //     padding: 20,
// //     backgroundColor: "white",
// //     borderRadius: 10,
// //     shadowOpacity: 0.2,
// //     shadowRadius: 5,
// //     shadowColor: "black",
// //     shadowOffset: { height: 0, width: 0 },
// //     margin: 20,
// //   },
// //   inputRow: {
// //     flexDirection: "row", // 横並びに配置
// //     justifyContent: "space-between", // 間隔を均等に配置
// //     alignItems: "center", // 中央揃え
// //     marginBottom: 20, // 入力行とボタン行の間のマージン
// //   },
// //   input: {
// //     height: 40,
// //     borderColor: "gray",
// //     borderWidth: 1,
// //     padding: 10,
// //     marginRight: 10, // 入力フィールド間の余白
// //     flex: 1, // フレックスアイテムの伸縮に応じて幅を調整
// //   },
// //   buttonContainer: {
// //     flexDirection: "row", // ボタンも横並びで配置する場合
// //     justifyContent: "center", // ボタンを中央に配置
// //   },
// // });

// // export default AddSavingForm;
