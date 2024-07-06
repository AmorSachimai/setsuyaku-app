import React, { useState, useRef } from "react";
import {
  Alert,
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Timestamp } from "firebase/firestore";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { ja } from "date-fns/locale";

export const BuyGohoubi = ({
  addExpense,
  setInputText,
  setInputAmount,
  selectedMonth,
  thisMonth,
}) => {
  const [amount, setAmount] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const amountInputRef = useRef(null);
  const textInputRef = useRef(null);

  const handleBuy = () => {
    if (amount.trim() === "") {
      Alert.alert("エラー", "値段を入力してください。");
      return;
    }

    const expenseDate = Timestamp.fromDate(date);

    addExpense(text, amount, expenseDate);

    setAmount("");
    setText("");
    setDate(new Date());
    console.log("保存", { amount, text, date: expenseDate });
    amountInputRef.current.blur();
    textInputRef.current.blur();
  };

  const reset = () => {
    setInputText("");
    setInputAmount("");
    setDate(new Date());
    amountInputRef.current.blur();
    textInputRef.current.blur();
  };

  const thisMonthForm = () => {
    const formattedDate = format(date, "yyyy/MM/dd", { locale: ja });
    const minimumDate = startOfMonth(new Date()); // 今月の初日
    const maximumDate = endOfMonth(new Date()); // 今月の最終日

    return (
      <View style={styles.container}>
        <Text style={styles.dialogTitle}>ご褒美を買う</Text>
        <View style={styles.inputRow}>
          <TextInput
            ref={textInputRef}
            style={styles.input}
            placeholder="何を買ったの？"
            placeholderTextColor="#999"
            keyboardType="default"
            value={text}
            onChangeText={setText}
            underlineColorAndroid="transparent"
          />
          <TextInput
            ref={amountInputRef}
            style={styles.input}
            placeholder="値段"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            underlineColorAndroid="transparent"
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>日付を選択</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setShowDatePicker(false);
                setDate(currentDate);
              }}
              minimumDate={minimumDate} // 今月の初日を選択不可に設定
              maximumDate={maximumDate} // 今月の最終日を選択不可に設定
              locale="ja-JP" // デバイスのロケールに依存
            />
          )}
          <Text style={styles.selectedDateText}>
            選択した日付: {formattedDate}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={reset}>
            <Text style={styles.buttonText}>キャンセル</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
            <Text style={styles.buttonText}>買う</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return <View>{thisMonth === selectedMonth ? thisMonthForm() : null}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: "#000",
    shadowOffset: { height: 0, width: 0 },
    margin: 15,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 8,
    marginRight: 5,
    color: "#333",
    backgroundColor: "#fff",
  },
  dateButton: {
    backgroundColor: "#ADD8E6",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 8,
  },
  dateButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  selectedDateText: {
    marginTop: 8,
    marginBottom: 15,
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#EFC2FF",
    padding: 8,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  buyButton: {
    backgroundColor: "#ADD8E6",
    padding: 8,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});
