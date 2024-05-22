// // import React from "react";
// // import { View, Text, TouchableOpacity } from "react-native";

// // export const ExpenseItem = ({
// //   deleteExpense,
// //   expenseItem,
// //   expenseText,
// //   expenseAmount,
// //   thisMonth,
// //   selectedMonth,
// // }) => {
// //   const deleteHandler = () => {
// //     deleteExpense(expenseItem.docId);
// //   };

// //   const percentage = () => {
// //     // if (incomeTotal >= 1) {
// //     //   return `${Math.round((expenseAmount) * 100)} %`;
// //     // } else {
// //       return "--";
// //     // }
// //   };

// //   const showThisMonth = () => {
// //     // return (
// //         // <View>
// //         //     <Text>aaaaa</Text>
// //         // </View>
// //     // );
// //     return (
// //       <View style={styles.thisMonthList}>
// //         <Text style={styles.text}>{expenseText}</Text>
// //         <Text style={styles.moneyMinus}>
// //           -{Number(expenseAmount).toLocaleString()}円
// //         </Text>
// //         <Text style={styles.percentage}>{percentage()}</Text>
// //         <TouchableOpacity 
// //           style={styles.deleteButton} 
// //           onPress={deleteHandler}>
// //           <Text style={styles.deleteButtonText}>×</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   };

// //   const showPastMonth = () => {
// //     return (
// //       <View style={styles.pastMonthList}>
// //         <Text style={styles.text}>{expenseText}</Text>
// //         <Text style={styles.moneyMinus}>
// //           -{Number(expenseAmount).toLocaleString()}円
// //         </Text>
// //         <Text style={styles.percentage}>{percentage()}</Text>
// //       </View>
// //     );
// //   };
// //    //return <>{showThisMonth()}</>;
// //   return <View>{thisMonth === selectedMonth ? showThisMonth() : showPastMonth()}</View>;
// // };

// // const styles = {
// //   thisMonthList: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     padding: 10,
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#ccc",
// //   },
// //   pastMonthList: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     padding: 10,
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#ccc",
// //     opacity: 0.5, // 過去の月のアイテムは半透明にする
// //   },
// //   text: {
// //     flex: 1,
// //     fontSize: 16,
// //   },
// //   moneyMinus: {
// //     fontSize: 16,
// //     marginRight: 10,
// //   },
// //   percentage: {
// //     fontSize: 16,
// //   },
// //   deleteButton: {
// //     backgroundColor: "red",
// //     borderRadius: 50,
// //     padding: 5,
// //   },
// //   deleteButtonText: {
// //     color: "white",
// //     fontSize: 16,
// //   },
// // };
// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// const ExpenseItem = ({
//   deleteExpense,
//   expenseText,
//   expenseAmount,
//   expenseItem,
//   selectedMonth,
//   thisMonth,
// }) => {
//   return (
//     <View style={styles.itemContainer}>
//       <Text style={styles.itemText}>{expenseText}</Text>
//       <Text style={styles.itemAmount}>{expenseAmount}円</Text>
//       <TouchableOpacity onPress={() => deleteExpense(expenseItem.docId)}>
//         <Text style={styles.deleteButton}>削除</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   itemText: {
//     fontSize: 16,
//   },
//   itemAmount: {
//     fontSize: 16,
//   },
//   deleteButton: {
//     color: "red",
//   },
// });

// export default ExpenseItem;


import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const ExpenseItem = ({
  deleteExpense,
  expenseItem,
  expenseText,
  expenseAmount,
  thisMonth,
  selectedMonth,
}) => {
  const deleteHandler = () => {
    deleteExpense(expenseItem.docId);
  };

  const percentage = () => {
    return "--";
  };

  const showThisMonth = () => {
    return (
      <View style={styles.thisMonthList}>
        <Text style={styles.text}>{expenseText}</Text>
        <Text style={styles.moneyMinus}>
          -{Number(expenseAmount).toLocaleString()}円
        </Text>
        <Text style={styles.percentage}>{percentage()}</Text>
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={deleteHandler}>
          <Text style={styles.deleteButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const showPastMonth = () => {
    return (
      <View style={styles.pastMonthList}>
        <Text style={styles.text}>{expenseText}</Text>
        <Text style={styles.moneyMinus}>
          -{Number(expenseAmount).toLocaleString()}円
        </Text>
        <Text style={styles.percentage}>{percentage()}</Text>
      </View>
    );
  };

  return (
    <View>
      {thisMonth === selectedMonth ? showThisMonth() : showPastMonth()}
    </View>
  );
};

const styles = {
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
  text: {
    flex: 1,
    fontSize: 16,
  },
  moneyMinus: {
    fontSize: 16,
    marginRight: 10,
  },
  percentage: {
    fontSize: 16,
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
};

export default ExpenseItem; // デフォルトエクスポートとしてエクスポート

