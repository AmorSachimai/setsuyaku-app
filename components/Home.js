//import { db } from "../firebase/Firebase";
import { Header } from "./Header";
import { Balance } from "./Balance";
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { totalCalc } from "./TotalSave";
//import { AuthContext } from "../auth/AuthProvider";
// おためし

function Home() {
  const [date, setDate] = useState(new Date());
  const [saveItems, setSaveItems] = useState([]);
  //const [expenseItems, setExpenseItems] = useState([]);
  //const [inputText, setInputText] = useState("");
  //const [inputAmount, setInputAmount] = useState(0);
  //const [type, setType] = useState("inc");

  // const { currentUser } = useContext(AuthContext);

  //for Header
  const setPrevMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth() - 1;
    const day = date.getDate();
    setDate(new Date(year, month, day));
  };

  const setNextMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setDate(new Date(year, month, day));
  };

  //get first date of the month
  const startOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  //get last date of this month
  const endOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  //operate add form and income/expense list
  const selectedMonth = date.getMonth() + 1;
  const today = new Date();
  const thisMonth = today.getMonth() + 1;

  // //for balance
  const getSaveData = () => {
    const saveData = db.collection("SaveItems");
    saveData
      //.where ("uid","==", currentUser.uid )
      .orderBy("date")
      .startAt(startOfMonth(date))
      .endAt(endOfMonth(date))
      .onSnapshot((query)=>{
        const saveItems = [];
          query.forEach((doc) =>
          saveItems.push({ ...doc.data(), docId: doc.id 
          })
        )
          setsaveItems(saveItems);
      });
  };
  // //firebase IncomeData
  // const getIncomeData = () => {
  //   const incomeData = db.collection("incomeItems");
  //   incomeData
  //     .where("uid", "==", currentUser.uid)
  //     .orderBy("date")
  //     .startAt(startOfMonth(date))
  //     .endAt(endOfMonth(date))
  //     .onSnapshot((query) => {
  //       const incomeItems = [];
  //       query.forEach((doc) =>
  //         incomeItems.push({ ...doc.data(), docId: doc.id })
  //       );
  //       setIncomeItems(incomeItems);
  //     });
  // };

  // const addIncome = (text, amount) => {
  //   const docId = Math.random().toString(32).substring(2);
  //   const date = firebase.firestore.Timestamp.now();
  //   db.collection("incomeItems")
  //     .doc(docId)
  //     .set({
  //       uid: currentUser.uid,
  //       text,
  //       amount,
  //       date,
  //     })
  //     .then((response) => {
  //       setIncomeItems([
  //         ...incomeItems,
  //         { text: inputText, amount: inputAmount, docId: docId, date: date },
  //       ]);
  //     });
  // };

  // const deleteIncome = (docId) => {
  //   db.collection("incomeItems").doc(docId).delete();
  // };

  // //firebase Expense data
  // const getExpenseData = () => {
  //   const expenseData = db.collection("expenseItems");
  //   expenseData
  //     .where("uid", "==", currentUser.uid)
  //     .orderBy("date")
  //     .startAt(startOfMonth(date))
  //     .endAt(endOfMonth(date))
  //     .onSnapshot((query) => {
  //       const expenseItems = [];
  //       query.forEach((doc) =>
  //         expenseItems.push({ ...doc.data(), docId: doc.id })
  //       );
  //       setExpenseItems(expenseItems);
  //     });
  // };

  // const addExpense = (text, amount) => {
  //   const docId = Math.random().toString(32).substring(2);
  //   const date = firebase.firestore.Timestamp.now();
  //   db.collection("expenseItems")
  //     .doc(docId)
  //     .set({
  //       uid: currentUser.uid,
  //       text,
  //       amount,
  //       date,
  //     })
  //     .then((response) => {
  //       setExpenseItems([
  //         ...expenseItems,
  //         { text: inputText, amount: inputAmount, docId: docId, date: date },
  //       ]);
  //     });
  // };

  // const deleteExpense = (docId) => {
  //   db.collection("expenseItems").doc(docId).delete();
  // };
   const saveTotal = totalCalc(saveItems);

  return (
    <View>
      <View>
        <Header
          date={date}
          setPrevMonth={setPrevMonth}
          setNextMonth={setNextMonth}
        />
        {/* <Balance 
        saveTotal={saveTotal}  
        />   */}
      </View>
    </View>
  );
}
export default Home;
