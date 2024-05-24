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

export const BuyGohoubi = ({
  addExpense,
  setInputText,
  setInputAmount,
  selectedMonth,
  thisMonth,
}) => {
  const [price, setPrice] = useState("");
  const [thing, setThing] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const priceInputRef = useRef(null);
  const thingInputRef = useRef(null);

  const handleBuy = () => {
    if (price.trim() === "") {
      Alert.alert("エラー", "値段を入力してください。");
      return;
    }

    const expenseDate = Timestamp.fromDate(date);

    addExpense(thing, price, expenseDate);

    setPrice("");
    setThing("");
    setDate(new Date());
    console.log("保存", { price, thing, date: expenseDate });
    priceInputRef.current.blur();
    thingInputRef.current.blur();
  };

  const reset = () => {
    setInputText("");
    setInputAmount("");
    setDate(new Date());
    priceInputRef.current.blur();
    thingInputRef.current.blur();
  };

  const thisMonthForm = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.dialogTitle}>ご褒美を買う</Text>
        <View style={styles.inputRow}>
          <TextInput
            ref={thingInputRef}
            style={styles.input}
            placeholder="何を買ったの？"
            placeholderTextColor="#999"
            keyboardType="default"
            value={thing}
            onChangeText={setThing}
            underlineColorAndroid="transparent"
          />
          <TextInput
            ref={priceInputRef}
            style={styles.input}
            placeholder="値段"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
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
            />
          )}
          <Text style={styles.selectedDateText}>
            選択した日付: {date.toDateString()}
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
