
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

export const SaveItem = ({
  deleteSave,
  saveItem,
  saveText,
  saveAmount,
  saveTime,
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
        { text: "OK", onPress: () => deleteSave(saveItem.docId) },
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
    const saveDate = saveTime.toDate();
    const saveMonth = saveDate.getMonth() + 1; // 月は0から始まるので+1
    const saveYear = saveDate.getFullYear();

    // 選択された月と年と一致する場合にtrueを返す
    return selectedMonth === saveMonth && selectedYear === saveYear;
  };

  // 表示条件に応じて項目をレンダリングする
  if (shouldDisplay()) {
    return (
      <Swipeable
        renderRightActions={renderRightActions}
        containerStyle={styles.swipeableContainer}
      >
        <View style={styles.saveList}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{saveText}</Text>
            <Text style={styles.dateText}>{formatDate(saveTime)}</Text>
          </View>
          <Text style={styles.moneyMinus}>
            {Number(saveAmount).toLocaleString()}円
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
  saveList: {
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

export default SaveItem;


// // 前の
// // import React from "react";
// // import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
// // import { Timestamp } from "firebase/firestore";

// // export const SaveItem = ({
// //   deleteSave,
// //   saveItem,
// //   saveText,
// //   saveAmount,
// //   saveTime,
// //   thisMonth,
// //   selectedMonth,
// // }) => {
// //   const deleteHandler = () => {
// //     Alert.alert(
// //       "削除の確認",
// //       "本当に削除しますか？",
// //       [
// //         {
// //           text: "キャンセル",
// //           style: "cancel",
// //         },
// //         { text: "OK", onPress: () => deleteSave(saveItem.docId) },
// //       ],
// //       { cancelable: false },
// //     );
// //   };

// //   // Timestampオブジェクトを適切な日付文字列に変換する関数
// //   const formatDate = (timestamp) => {
// //     if (timestamp instanceof Timestamp) {
// //       const date = timestamp.toDate();
// //       return date.toLocaleString(); // 日付と時刻をローカライズされた文字列に変換
// //     }
// //     return "";
// //   };

// //   const showThisMonth = () => {
// //     return (
// //       <View style={styles.thisMonthList}>
// //         <View style={styles.textContainer}>
// //           <Text style={styles.text}>{saveText}</Text>
// //           <Text style={styles.dateText}>{formatDate(saveTime)}</Text>
// //         </View>
// //         <Text style={styles.moneyMinus}>
// //           -{Number(saveAmount).toLocaleString()}円
// //         </Text>
// //         <TouchableOpacity style={styles.deleteButton} onPress={deleteHandler}>
// //           <Text style={styles.deleteButtonText}>×</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   };

// //   const showPastMonth = () => {
// //     return (
// //       <View style={styles.pastMonthList}>
// //         <View style={styles.textContainer}>
// //           <Text style={styles.text}>{saveText}</Text>
// //           <Text style={styles.dateText}>{formatDate(saveTime)}</Text>
// //         </View>
// //         <Text style={styles.moneyMinus}>
// //           -{Number(saveAmount).toLocaleString()}円
// //         </Text>
// //       </View>
// //     );
// //   };

// //   return (
// //     <View>
// //       {thisMonth === selectedMonth ? showThisMonth() : showPastMonth()}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
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
// //   textContainer: {
// //     flex: 1,
// //   },
// //   text: {
// //     fontSize: 16,
// //   },
// //   dateText: {
// //     fontSize: 12,
// //     color: "#666",
// //   },
// //   moneyMinus: {
// //     fontSize: 16,
// //     marginRight: 10,
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
// // });

// // export default SaveItem;
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

// export const SaveItem = ({
//   deleteSave,
//   saveItem,
//   saveText,
//   saveAmount,
//   saveTime,
//   // thisMonth,
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
//         { text: "OK", onPress: () => deleteSave(saveItem.docId) },
//       ],
//       { cancelable: false }
//     );
//   };

//   // Timestampオブジェクトを適切な日付文字列に変換する関数
//   const formatDate = (timestamp) => {
//     if (timestamp instanceof Timestamp) {
//       const date = timestamp.toDate();
//       return date.toLocaleString(); // 日付と時刻をローカライズされた文字列に変換
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
//               transform: [
//                 {
//                   translateX: progress.interpolate({
//                     inputRange: [0, 100],
//                     outputRange: [0, 100],
//                     extrapolate: "clamp",
//                   }),
//                 },
//               ],
//               opacity: progress.interpolate({
//                 inputRange: [0, 100],
//                 outputRange: [1, 0],
//                 extrapolate: "clamp",
//               }),
//             },
//           ]}
//         >
//           <Text style={styles.deleteButtonText}>×</Text>
//         </Animated.View>
//       </TouchableOpacity>
//     );
//   };

//   const showThisMonth = () => {
//     return (
//       <Swipeable renderRightActions={renderRightActions}>
//         <View style={styles.thisMonthList}>
//           <View style={styles.textContainer}>
//             <Text style={styles.text}>{saveText}</Text>
//             <Text style={styles.dateText}>{formatDate(saveTime)}</Text>
//           </View>
//           <Text style={styles.moneyMinus}>
//             {Number(saveAmount).toLocaleString()}円
//           </Text>
//         </View>
//       </Swipeable>
//     );
//   };

//   const showPastMonth = () => {
//     return (
//       <View style={styles.pastMonthList}>
//         <View style={styles.textContainer}>
//           <Text style={styles.text}>{saveText}</Text>
//           <Text style={styles.dateText}>{formatDate(saveTime)}</Text>
//         </View>
//         <Text style={styles.moneyMinus}>
//           {Number(saveAmount).toLocaleString()}円
//         </Text>
//       </View>
//     );
//   };

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
//     opacity: 0.5, // 過去の月のアイテムは半透明にする
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

// export default SaveItem;
