// import React from "react";
// import { View, Text, ScrollView } from "react-native";
// import ExpenseItem from "./ExpenseItem";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase/Firebase";


// export const BuyItemsList = ({
//   deleteExpense,
//   expenseItem,
//   selectedMonth,
//   thisMonth,
// }) => {
// const expenseItemsList = getDocs(collection(db, "expenseItems"))
//     .then(expenseItemsList=>{
        
//         expenseItemsList.forEach(doc=>{
//             //console.log(doc.id)
//         })
//     })

//   return (
//     <View>
//       <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
//         支出一覧
//       </Text>
//       <View>
//         {expenseItemsList.length === 0 ? (
//           <Text>No expenses</Text>
//         ) : (
//           <View>
//             {getDocs(collection(db, "expenseItems"))
//     .then(expenseItemsList=>{
//             expenseItemsList.map((expenseItem) => (
//               <ExpenseItem
//                 deleteExpense={deleteExpense}
//                 expenseText={expenseItem.thenext} // ここを修正
//                 expenseAmount={expenseItem.amount} // ここを修正
//                 expenseItem={expenseItem}
//                 key={expenseItem.docId}
//                 selectedMonth={selectedMonth}
//                 thisMonth={thisMonth}
//               />
//             ));}
//           )}
//           </View>
//         )}
           
//       </View>
//     </View>
//   );
// };
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import ExpenseItem from "./ExpenseItem"; // Ensure the path is correct
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Firebase"; // Ensure the path is correct

export const BuyItemsList = ({
  deleteExpense,
  selectedMonth,
  thisMonth,
}) => {
  const [expenseItems, setExpenseItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "expenseItems"));
        const expenses = [];
        querySnapshot.forEach((doc) => {
          expenses.push({ ...doc.data(), docId: doc.id });
        });
        setExpenseItems(expenses);
      } catch (error) {
        console.error("Error fetching expense items: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        支出一覧
      </Text>
      <ScrollView>
        {expenseItems.length === 0 ? (
          <Text>No expenses</Text>
        ) : (
          expenseItems.map((expenseItem) => (
            <ExpenseItem
              key={expenseItem.docId}
              deleteExpense={deleteExpense}
              expenseText={expenseItem.thing} // Adjust based on your data structure
              expenseAmount={expenseItem.price} // Adjust based on your data structure
              expenseItem={expenseItem}
              selectedMonth={selectedMonth}
              thisMonth={thisMonth}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default BuyItemsList; // Ensure the component is exported

