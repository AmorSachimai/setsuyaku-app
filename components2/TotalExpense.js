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
