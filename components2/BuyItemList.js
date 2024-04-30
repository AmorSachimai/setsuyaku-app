import React from "react";
import { View, Text, ScrollView } from "react-native";
import ExpenseItem from "./ExpenseItem";

export const BuyItemsList = ({

  deleteExpense,
  
  expenseItems,
  selectedMonth,
  thisMonth,
}) => {
  console.log(expenseItems.amount);
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        支出一覧 :{expenseItems.text}
      </Text>
{/* //表示されません */}
      <View>
        {expenseItems.map((expenseItem) => (
          <ExpenseItem
            deleteExpense={deleteExpense}
            expenseText={expenseItem.text}
            expenseAmount={expenseItem.amount}
            expenseItem={expenseItem}
            key={expenseItem.docId}
            selectedMonth={selectedMonth}
            thisMonth={thisMonth}
          />
        ))}
        
      </View>
    </View>
  );
};
