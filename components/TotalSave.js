// TotalBuy ここから
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const TotalSave = ({ saveTotal }) => {
  console.log("expenxedata:", saveTotal);
  // 数値に変換
  const numericTotal =
    typeof saveTotal === "number" ? saveTotal : parseFloat(saveTotal);

  // 数値が有効かどうか確認
  if (isNaN(numericTotal)) {
    console.error("Invalid saveTotal value:", saveTotal);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>使ったお金</Text>
        <Text style={styles.error}>無効な値です</Text>
      </View>
    );
  }

  // 数値をフォーマットして表示
  const formattedTotalAmount = new Intl.NumberFormat().format(numericTotal);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>使ったお金</Text>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>{formattedTotalAmount}</Text>
        <Text style={styles.currency}>円</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    fontFamily: "Arial",
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalText: {
    fontSize: 32,
    marginRight: 5,
    color: "#007bff",
    fontFamily: "Arial",
  },
  currency: {
    fontSize: 24,
    color: "#333",
    fontFamily: "Arial",
  },
  error: {
    fontSize: 18,
    color: "red",
    fontFamily: "Arial",
  },
});

// ここまで

// TotalExpense ここから
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/Firebase";

export const totalCalc = async (uid, selectedMonth, selectedYear) => {
  try {
    // コレクションを取得
    const coll = collection(db, "saveItems");

    // UIDと選択された月と年が一致するドキュメントをクエリ
    const startOfMonth = new Date(selectedYear, selectedMonth - 1, 1);
    const endOfMonth = new Date(selectedYear, selectedMonth, 0);

    const q = query(
      coll,
      where("uid", "==", uid),
      where("time", ">=", startOfMonth),
      where("time", "<=", endOfMonth),
    );

    // クエリ結果を取得
    const querySnapshot = await getDocs(q);

    // amountの合計を計算
    let totalAmount = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const amount = parseFloat(data.amount);
      if (!isNaN(amount)) {
        totalAmount += amount;
      } else {
        console.error(`無効なamountの値が見つかりました: ${data.amount}`);
      }
    });

    // 結果をコンソールに出力
    console.log(`UID ${uid} で ${selectedMonth} 月の合計amount: `, totalAmount);
    return totalAmount;
  } catch (error) {
    console.error("合計amountの計算中にエラーが発生しました: ", error.message);
    throw error; // エラーを再スローして呼び出し元で処理できるようにします
  }
};

// ここまで

// // 月ごとの節約額の計算

// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../firebase/Firebase";

// export const totalCalc = async (uid, selectedMonth, selectedYear) => {
//   try {
//     // コレクションを取得
//     const coll = collection(db, "saveItems");

//     // UIDが一致するドキュメントをクエリ
//     const q = query(coll, where("uid", "==", uid));

//     // クエリ結果を取得
//     const querySnapshot = await getDocs(q);

//     // amountの合計を計算
//     let totalAmount = 0;
//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       const amount = parseFloat(data.amount);
//       if (!isNaN(amount)) {
//         totalAmount += amount;
//       } else {
//         console.error(`無効なamountの値が見つかりました: ${data.amount}`);
//       }
//     });

//     // 結果をコンソールに出力
//     console.log(`UID ${uid} の合計amount: `, totalAmount);
//     return totalAmount;
//   } catch (error) {
//     console.error("合計amountの計算中にエラーが発生しました: ", error.message);
//     throw error; // エラーを再スローして呼び出し元で処理できるようにします
//   }
// };

// // //import React from "react";

// // export const totalCalc = (saveItems) => {
// //   const saveAmounts = saveItems.map((saveItem) => saveItem.amount);
// //   return saveAmounts.reduce((acc, cur) => (acc += cur), 0);
// // };