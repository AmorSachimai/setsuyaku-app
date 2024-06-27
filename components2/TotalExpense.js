// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../firebase/Firebase";

// export const totalCalc = async (uid, selectedMonth) => {
//   try {
//     // コレクションを取得
//     const coll = collection(db, "expenseItems");

//     // UIDと選択された月が一致するドキュメントをクエリ
//     const q = query(
//       coll,
//       where("uid", "==", uid),
//       where(
//         "time",
//         ">=",
//         new Date(new Date().getFullYear(), selectedMonth - 1, 1)
//       ),
//       where("time", "<=", new Date(new Date().getFullYear(), selectedMonth, 0))
//     );

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
//     console.log(`UID ${uid} で ${selectedMonth} 月の合計amount: `, totalAmount);
//     return totalAmount;
//   } catch (error) {
//     console.error("合計amountの計算中にエラーが発生しました: ", error.message);
//     throw error; // エラーを再スローして呼び出し元で処理できるようにします
//   }
// };

// TotalExpense.js

// import { db } from "../firebase/Firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// export const totalCalc = async (uid, month, year) => {
//   const expenseItemsRef = collection(db, "expenseItems");
//   const q = query(
//     expenseItemsRef,
//     where("uid", "==", uid),
//     where("time.month", "==", month),
//     where("time.year", "==", year)
//   );

//   let totalAmount = 0;

//   try {
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       totalAmount += doc.data().amount;
//     });
//   } catch (error) {
//     console.error("Error fetching documents: ", error);
//   }

//   return totalAmount;
// };

// TotalExpense.js
// TotalExpense.js

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/Firebase";

export const totalCalc = async (uid, selectedMonth, selectedYear) => {
  try {
    // コレクションを取得
    const coll = collection(db, "expenseItems");

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
