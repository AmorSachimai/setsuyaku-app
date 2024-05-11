import React from "react";
import { View, Text, ScrollView } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import firebase from "firebase/app";

export const BuyItemsList = ({
  deleteExpense,
  expenseItems,
  selectedMonth,
  thisMonth,
}) => {
const expenseItemsList = getDocs(collection(db, "expenseItems"))
    .then(expenseItemsList=>{
        
        expenseItemsList.forEach(doc=>{
            //console.log(doc.id)
        })
    })

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        支出一覧
      </Text>
      <View>
        {expenseItemsList.length === 0 ? (
          <Text>No expenses</Text>
        ) : (
          <View>
            {getDocs(collection(db, "expenseItems"))
    .then(expenseItemsList=>{
            expenseItemsList.map((expenseItem) => (
              <ExpenseItem
                deleteExpense={deleteExpense}
                expenseText={expenseItem.thenext} // ここを修正
                expenseAmount={expenseItem.amount} // ここを修正
                expenseItem={expenseItem}
                key={expenseItem.docId}
                selectedMonth={selectedMonth}
                thisMonth={thisMonth}
              />
            ));}
          )}
          </View>
        )}
           
      </View>
    </View>
  );
};
