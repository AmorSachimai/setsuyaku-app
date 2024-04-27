import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text, Keyboard } from 'react-native';

function GoalAmountForm() {
    const [goalAmount, setGoalAmount] = useState('');
    const [displayAmount, setDisplayAmount] = useState('');
    const [editMode, setEditMode] = useState(false);  // 編集モードの状態を追跡

    const handleSave = () => {
        setDisplayAmount(goalAmount);  // 目標金額を表示エリアに設定
        setEditMode(false);  // 編集モードをオフに
        Keyboard.dismiss();  // キーボードを閉じる
    };

    const toggleEdit = () => {
        setEditMode(true);  // 編集モードをオンに
        setGoalAmount(displayAmount);  // 現在の目標金額を入力フィールドにセット
    };

    return (
        <View style={styles.container}>
            {editMode ? (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="目標金額を入力"
                        value={goalAmount}
                        keyboardType="numeric"
                        onChangeText={text => setGoalAmount(text.replace(/[^0-9]/g, ''))}  // 数字以外の入力を除去
                    />
                    <Button
                        title="保存"
                        onPress={handleSave}
                    />
                </View>
            ) : (
                <View style={styles.displayContainer}>
                    <Text style={styles.displayText}>
                        目標金額: {displayAmount}円
                    </Text>
                    <Button
                        title="編集"
                        onPress={toggleEdit}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 0, width: 0 },
        margin: 20
    },
    inputContainer: {
        flexDirection: 'row', // 子要素を横に並べる
        alignItems: 'center', // 子要素を中央揃えに
    },
    displayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        flex: 1, // フレックスボックスの拡張性を設定
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10, // ボタンとの間隔
        padding: 10
    },
    displayText: {
        fontSize: 18,
        flex: 1
    }
});

export default GoalAmountForm;
