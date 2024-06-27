import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import SaveItem from "./SaveItem"; // パスが正しいことを確認してください
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/Firebase"; // パスが正しいことを確認してください

export const SaveItemsList = ({
  deleteSave,
  selectedMonth,
  thisMonth,
  uid,
}) => {
  const [saveItems, setSaveItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // 支出項目を取得し、リアルタイム更新にサブスクライブする関数
    const fetchSaves = () => {
      // uidでフィルタリングするためのクエリを作成
      const q = query(collection(db, "saveItems"), where("uid", "==", uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const saves = [];
        snapshot.forEach((doc) => {
          saves.push({ ...doc.data(), docId: doc.id });
        });

        // 日付で支出項目をソート（saveItem.timeがFirestoreのTimestampであることを仮定）
        saves.sort((a, b) => b.time.seconds - a.time.seconds);

        setSaveItems(saves);
        setLoading(false);
      });

      // コンポーネントがアンマウントされるときにリアルタイム更新のサブスクライブを解除するクリーンアップ関数
      return unsubscribe;
    };

    // fetchSaves関数を呼び出してデータの取得と更新のサブスクライブを開始
    fetchSaves();
  }, [uid]); // uidが変更されたときにのみ実行

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        節約一覧
      </Text>
      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        contentContainerStyle={styles.contentContainer}
      >
        {saveItems.length === 0 ? (
          <Text style={styles.noSavesText}>
            節約を記録して自分の頑張りを褒めましょう！
          </Text>
        ) : (
          saveItems.map((saveItem) => (
            <SaveItem
              key={saveItem.docId}
              deleteSave={deleteSave}
              saveText={saveItem.text}
              saveAmount={saveItem.amount}
              saveTime={saveItem.time}
              saveItem={saveItem}
              selectedMonth={selectedMonth}
              thisMonth={thisMonth}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  contentContainer: {
    paddingBottom: 80, // 必要に応じて調整
  },
  noSavesText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
});
