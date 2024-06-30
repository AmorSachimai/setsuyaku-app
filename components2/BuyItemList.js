import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ExpenseItem from "./ExpenseItem"; 
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/Firebase"; 

export const BuyItemsList = ({
  deleteExpense,
  selectedMonth,
  selectedYear,
  thisMonth,
  uid,
}) => {
  const [expenseItems, setExpenseItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    
    const fetchExpenses = () => {
      
      const q = query(collection(db, "expenseItems"), where("uid", "==", uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const expenses = [];
        snapshot.forEach((doc) => {
          expenses.push({ ...doc.data(), docId: doc.id });
        });

        
        expenses.sort((a, b) => b.time.seconds - a.time.seconds);

        setExpenseItems(expenses);
        setLoading(false);
      });

      
      return unsubscribe;
    };

    
    fetchExpenses();
  }, [uid]); 

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        支出一覧
      </Text>
      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        contentContainerStyle={styles.contentContainer}
      >
        {expenseItems.length === 0 ? (
          <Text style={styles.noExpensesText}>何も買ってないよ</Text>
        ) : (
          expenseItems.map((expenseItem) => (
            <ExpenseItem
              key={expenseItem.docId}
              deleteExpense={deleteExpense}
              expenseText={expenseItem.text}
              expenseAmount={expenseItem.amount}
              expenseTime={expenseItem.time}
              expenseItem={expenseItem}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
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
    paddingBottom: 80, 
  },
  noExpensesText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
});
