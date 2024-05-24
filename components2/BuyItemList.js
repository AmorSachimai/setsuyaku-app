
// import React, { useEffect, useState } from "react";
// import { View, Text, ScrollView, StyleSheet } from "react-native";
// import ExpenseItem from "./ExpenseItem"; // Ensure the path is correct
// import { collection, getDocs, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase/Firebase"; // Ensure the path is correct

// export const BuyItemsList = ({
//   deleteExpense,
//   selectedMonth,
//   thisMonth,
// }) => {
//   const [expenseItems, setExpenseItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Function to fetch expenses and subscribe to realtime updates
//     const fetchExpenses = () => {
//       const unsubscribe = onSnapshot(
//         collection(db, "expenseItems"),
//         (snapshot) => {
//           const expenses = [];
//           snapshot.forEach((doc) => {
//             expenses.push({ ...doc.data(), docId: doc.id });
//           });
//           setExpenseItems(expenses);
//           setLoading(false);
//         }
//       );

//       // Cleanup function to unsubscribe from realtime updates when component unmounts
//       return unsubscribe;
//     };

//     // Call the fetchExpenses function to start fetching data and subscribing to updates
//     fetchExpenses();
//   }, []); // Only run once when the component mounts

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View>
//       <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
//         支出一覧
//       </Text>
//       <ScrollView>
//         {expenseItems.length === 0 ? (
//           <Text style={styles.noExpensesText}>何も買ってないよ</Text>
//         ) : (
//           expenseItems.map((expenseItem) => (
//             <ExpenseItem
//               key={expenseItem.docId}
//               deleteExpense={deleteExpense}
//               expenseText={expenseItem.text} 
//               expenseAmount={expenseItem.amount} 
//               expenseTime={expenseItem.time}
//               expenseItem={expenseItem}
//               selectedMonth={selectedMonth}
//               thisMonth={thisMonth}
//             />
//           ))
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   noExpensesText: {
//     fontSize: 16,
//     color: "#888",
//     textAlign: "center",
//     marginTop: 20,
//     fontStyle: "italic",
//   },
// });


import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ExpenseItem from "./ExpenseItem"; // Ensure the path is correct
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/Firebase"; // Ensure the path is correct

export const BuyItemsList = ({
  deleteExpense,
  selectedMonth,
  thisMonth,
}) => {
  const [expenseItems, setExpenseItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch expenses and subscribe to realtime updates
    const fetchExpenses = () => {
      const unsubscribe = onSnapshot(
        collection(db, "expenseItems"),
        (snapshot) => {
          const expenses = [];
          snapshot.forEach((doc) => {
            expenses.push({ ...doc.data(), docId: doc.id });
          });

          // Sort expenses by date (assuming expenseItem.time is a Firestore Timestamp)
          expenses.sort((a, b) => b.time.seconds - a.time.seconds);

          setExpenseItems(expenses);
          setLoading(false);
        }
      );

      // Cleanup function to unsubscribe from realtime updates when component unmounts
      return unsubscribe;
    };

    // Call the fetchExpenses function to start fetching data and subscribing to updates
    fetchExpenses();
  }, []); // Only run once when the component mounts

  if (loading) {
    return <Text>Loading...</Text>;
  }


  //const scrollViewRef = useRef(null);

  return (
    <View style={{ height: 1000 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        支出一覧
      </Text>
      <ScrollView
        style={styles.scrollView}
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
              thisMonth={thisMonth}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 80, // Add padding to the bottom of the ScrollView
    
  },
  noExpensesText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
});

