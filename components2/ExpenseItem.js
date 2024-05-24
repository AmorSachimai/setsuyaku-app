// // //日付追加できるようにしたい

import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Timestamp } from "firebase/firestore";

export const ExpenseItem = ({
  deleteExpense,
  expenseItem,
  expenseText,
  expenseAmount,
  expenseTime,
  thisMonth,
  selectedMonth,
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
      { cancelable: false }
    );
  };

  // Timestampオブジェクトを適切な日付文字列に変換する関数
  const formatDate = (timestamp) => {
    if (timestamp instanceof Timestamp) {
      const date = timestamp.toDate();
      return date.toLocaleString(); // 日付と時刻をローカライズされた文字列に変換
    }
    return "";
  };

  const showThisMonth = () => {
    return (
      <View style={styles.thisMonthList}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{expenseText}</Text>
          <Text style={styles.dateText}>{formatDate(expenseTime)}</Text>
        </View>
        <Text style={styles.moneyMinus}>
          -{Number(expenseAmount).toLocaleString()}円
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={deleteHandler}>
          <Text style={styles.deleteButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const showPastMonth = () => {
    return (
      <View style={styles.pastMonthList}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{expenseText}</Text>
          <Text style={styles.dateText}>{formatDate(expenseTime)}</Text>
        </View>
        <Text style={styles.moneyMinus}>
          -{Number(expenseAmount).toLocaleString()}円
        </Text>
      </View>
    );
  };

  return (
    <View>
      {thisMonth === selectedMonth ? showThisMonth() : showPastMonth()}
    </View>
  );
};

const styles = StyleSheet.create({
  thisMonthList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  pastMonthList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    opacity: 0.5, // 過去の月のアイテムは半透明にする
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



// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

// const ExpenseItem = ({
//   deleteExpense,
//   expenseItem,
//   expenseText,
//   expenseAmount,
//   expenseTime,
//   thisMonth,
//   selectedMonth,
// }) => {
//   const deleteHandler = () => {
//     Alert.alert(
//       "削除の確認",
//       "本当に削除しますか？",
//       [
//         {
//           text: "キャンセル",
//           style: "cancel",
//         },
//         { text: "OK", onPress: () => deleteExpense(expenseItem.docId) },
//       ],
//       { cancelable: false }
//     );
//   };

//   const formattedTime =
//     expenseTime && expenseTime.seconds
//       ? new Date(expenseTime.seconds * 1000).toLocaleString()
//       : "日時不明";

//   const showThisMonth = () => (
//     <View style={styles.thisMonthList}>
//       <Text style={styles.text}>{expenseText}</Text>
//       <Text style={styles.moneyMinus}>
//         -{Number(expenseAmount).toLocaleString()}円
//       </Text>
//       <Text style={styles.dateText}>{formattedTime}</Text>
//       <TouchableOpacity style={styles.deleteButton} onPress={deleteHandler}>
//         <Text style={styles.deleteButtonText}>×</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const showPastMonth = () => (
//     <View style={styles.pastMonthList}>
//       <Text style={styles.text}>{expenseText}</Text>
//       <Text style={styles.moneyMinus}>
//         -{Number(expenseAmount).toLocaleString()}円
//       </Text>
//       <Text style={styles.dateText}>{formattedTime}</Text>
//     </View>
//   );

//   return (
//     <View>
//       {thisMonth === selectedMonth ? showThisMonth() : showPastMonth()}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   thisMonthList: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   pastMonthList: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     opacity: 0.5,
//   },
//   text: {
//     flex: 1,
//     fontSize: 16,
//   },
//   moneyMinus: {
//     fontSize: 16,
//     marginRight: 10,
//   },
//   dateText: {
//     fontSize: 12,
//     color: "#666",
//   },
//   deleteButton: {
//     backgroundColor: "red",
//     borderRadius: 50,
//     padding: 5,
//   },
//   deleteButtonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });

// export default ExpenseItem;
