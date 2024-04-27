import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Keyboard } from 'react-native';

function AddSavingForm() {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    console.log("Saved", { date, name, amount });
    setDate('');
    setName('');
    setAmount('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 2 }]}
          value={date}
          placeholder="日付 (YYYY-MM-DD)"
          onChangeText={setDate}
        />
        <TextInput
          style={[styles.input, { flex: 3 }]}
          value={name}
          placeholder="名目"
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, { flex: 2 }]}
          value={amount}
          placeholder="金額"
          keyboardType="numeric"
          onChangeText={text => setAmount(text.replace(/[^0-9]/g, ''))}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="セツヤク！"
          onPress={handleSubmit}
          color="#007BFF"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    margin: 20
  },
  inputRow: {
    flexDirection: 'row', // 横並びに配置
    justifyContent: 'space-between', // 間隔を均等に配置
    alignItems: 'center', // 中央揃え
    marginBottom: 20 // 入力行とボタン行の間のマージン
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginRight: 10, // 入力フィールド間の余白
    flex: 1 // フレックスアイテムの伸縮に応じて幅を調整
  },
  buttonContainer: {
    flexDirection: 'row', // ボタンも横並びで配置する場合
    justifyContent: 'center' // ボタンを中央に配置
  }
});

export default AddSavingForm;
