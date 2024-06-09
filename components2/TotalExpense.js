// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   getDocs,
// } from "firebase/firestore";
// import { db } from "../firebase/Firebase";
// import { Await } from "react-router-dom";

// export const totalCalc = async (uid) => {
//   try {
//     // コレクションを取得
//     const coll = collection(db, "expenseItems");

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
//     console.error("合計amountの計算中にエラーが発生しました: ", error);
//   }
   
// };


import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/Firebase";

export const totalCalc = async (uid) => {
  try {
    // コレクションを取得
    const coll = collection(db, "expenseItems");

    // UIDが一致するドキュメントをクエリ
    const q = query(coll, where("uid", "==", uid));

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
    console.log(`UID ${uid} の合計amount: `, totalAmount);
    return totalAmount;
  } catch (error) {
    console.error("合計amountの計算中にエラーが発生しました: ", error.message);
    throw error; // エラーを再スローして呼び出し元で処理できるようにします
  }
};
