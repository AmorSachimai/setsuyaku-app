import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Timestamp } from "firebase/firestore";

export const SaveItem = ({
  deleteSave,
  saveItem,
  saveText,
  saveAmount,
  saveTime,
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
        { text: "OK", onPress: () => deleteSave(saveItem.docId) },
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
          <Text style={styles.text}>{saveText}</Text>
          <Text style={styles.dateText}>{formatDate(saveTime)}</Text>
        </View>
        <Text style={styles.moneyMinus}>
          -{Number(saveAmount).toLocaleString()}円
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
          <Text style={styles.text}>{saveText}</Text>
          <Text style={styles.dateText}>{formatDate(saveTime)}</Text>
        </View>
        <Text style={styles.moneyMinus}>
          -{Number(saveAmount).toLocaleString()}円
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

export default SaveItem;