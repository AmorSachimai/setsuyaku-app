// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   Animated,
// } from "react-native";
// import { Timestamp } from "firebase/firestore";
// import { Swipeable } from "react-native-gesture-handler";

// export const ExpenseItem = ({
//   deleteExpense,
//   expenseItem,
//   expenseText,
//   expenseAmount,
//   expenseTime,
//   selectedMonth,
//   selectedYear,
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

//   // Timestampオブジェクトを適切な日付文字列に変換する関数
//   const formatDate = (timestamp) => {
//     if (timestamp instanceof Timestamp) {
//       const date = timestamp.toDate();
//       return date.toLocaleString();
//     }
//     return "";
//   };

//   const renderRightActions = (progress, dragX) => {
//     const trans = dragX.interpolate({
//       inputRange: [0, 50, 100],
//       outputRange: [0, 0.2, 1],
//     });
//     return (
//       <TouchableOpacity onPress={deleteHandler}>
//         <Animated.View
//           style={[
//             styles.deleteButton,
//             {
//               transform: [{ translateX: progress.interpolate({
//                 inputRange: [0, 100],
//                 outputRange: [0, 100],
//                 extrapolate: 'clamp',
//               }) }],
//               opacity: progress.interpolate({
//                 inputRange: [0, 100],
//                 outputRange: [1, 0],
//                 extrapolate: 'clamp',
//               }),
//             },
//           ]}
//         >
//           <Text style={styles.deleteButtonText}>×</Text>
//         </Animated.View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <Swipeable
//       renderRightActions={renderRightActions}
//       containerStyle={styles.swipeableContainer}
//     >
//       <View style={styles.expenseList}>
//         <View style={styles.textContainer}>
//           <Text style={styles.text}>{expenseText}</Text>
//           <Text style={styles.dateText}>{formatDate(expenseTime)}</Text>
//         </View>
//         <Text style={styles.moneyMinus}>
//           {Number(expenseAmount).toLocaleString()}円
//         </Text>
//       </View>
//     </Swipeable>
//   );
// };

// const styles = StyleSheet.create({
//   swipeableContainer: {
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   expenseList: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   text: {
//     fontSize: 16,
//   },
//   dateText: {
//     fontSize: 12,
//     color: "#666",
//   },
//   moneyMinus: {
//     fontSize: 16,
//     marginRight: 10,
//   },
//   deleteButton: {
//     backgroundColor: "red",
//     justifyContent: "center",
//     alignItems: "center",
//     width: 75,
//     height: "100%",
//   },
//   deleteButtonText: {
//     color: "white",
//     fontSize: 20,
//   },
// });

// export default ExpenseItem;
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Animated,
} from "react-native";
import { Timestamp } from "firebase/firestore";
import { Swipeable } from "react-native-gesture-handler";

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
      { cancelable: false }
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

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [0, 0.2, 1],
    });
    return (
      <TouchableOpacity onPress={deleteHandler}>
        <Animated.View
          style={[
            styles.deleteButton,
            {
              transform: [
                {
                  translateX: progress.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 100],
                    extrapolate: "clamp",
                  }),
                },
              ],
              opacity: progress.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0],
                extrapolate: "clamp",
              }),
            },
          ]}
        >
          <Text style={styles.deleteButtonText}>×</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  // 項目を表示する条件を設定する
  const shouldDisplay = () => {
    const expenseDate = expenseTime.toDate();
    const expenseMonth = expenseDate.getMonth() + 1; // 月は0から始まるので+1
    const expenseYear = expenseDate.getFullYear();

    // 選択された月と年と一致する場合にtrueを返す
    return selectedMonth === expenseMonth && selectedYear === expenseYear;
  };

  // 表示条件に応じて項目をレンダリングする
  if (shouldDisplay()) {
    return (
      <Swipeable
        renderRightActions={renderRightActions}
        containerStyle={styles.swipeableContainer}
      >
        <View style={styles.expenseList}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{expenseText}</Text>
            <Text style={styles.dateText}>{formatDate(expenseTime)}</Text>
          </View>
          <Text style={styles.moneyMinus}>
            {Number(expenseAmount).toLocaleString()}円
          </Text>
        </View>
      </Swipeable>
    );
  } else {
    return null; // 条件に合わない場合は何もレンダリングしない
  }
};

const styles = StyleSheet.create({
  swipeableContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  expenseList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
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
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "100%",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 20,
  },
});

export default ExpenseItem;
