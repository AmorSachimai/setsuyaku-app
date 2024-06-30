// // // //日付追加できるようにしたい

import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Timestamp } from "firebase/firestore";

export const ExpenseItem = ({
  deleteExpense,
  expenseItem,
  expenseText,
  expenseAmount,
  expenseTime,
  selectedMonth,
  selectedYear,
}) => {
  const deleteHandler = () => {
    Alert.alert(
      "削除の確認",
      "本当に削除しますか？",
      [
        {
          text: "キャンセル",
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteExpense(expenseItem.docId) },
      ],
      { cancelable: false },
    );
  };

  // Timestampオブジェクトを適切な日付文字列に変換する関数
  const formatDate = (timestamp) => {
    if (timestamp instanceof Timestamp) {
      const date = timestamp.toDate();
      return date.toLocaleString(); 
    }
    return "";
  };

  const showExpenseItem = () => {
    return (
      <View style={styles.expenseList}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{expenseText}</Text>
          <Text style={styles.dateText}>{formatDate(expenseTime)}</Text>
        </View>
        <Text style={styles.moneyMinus}>
          {Number(expenseAmount).toLocaleString()}円
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={deleteHandler}>
          <Text style={styles.deleteButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const expenseDate = expenseTime.toDate();
  //console.log(expenseDate);
  const expenseMonth = expenseDate.getMonth() + 1; // 月は0から始まるので+1
  const expenseYear = expenseDate.getFullYear();
  //console.log(expenseMonth);
  //console.log(selectedMonth);
  //console.log(selectedYear);
  // 指定された月と年に一致する場合のみ表示
  if (selectedMonth === expenseMonth && selectedYear === expenseYear) {
    return <View>{showExpenseItem()}</View>;
  }

  return null;
};

const styles = StyleSheet.create({
  expenseList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 12,
    color: "#666",
  },
  moneyMinus: {
    fontSize: 16,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 50,
    padding: 5,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ExpenseItem;
