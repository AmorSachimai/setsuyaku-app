//こちらでは今までの月で計上された節約額の合計からギフトを送ったり、
//ご褒美を購入したりすることにより引き算の処理がなされます


import { auth } from "../firebase/Firebase"
import { Header2 } from "./Header2";
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Logout } from "../auth/Logout";
import { BuyGohoubi } from "./BuyGohoubi";
import { Balance } from "../components/Balance";
import { db } from "../firebase/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import {BuyItemsList} from "./BuyItemList"


function Home2() {
  const [date, setDate] = useState(new Date());
  const [expenseItems, setExpenseItems] = useState([]);
  //const [expenseItems, setExpenseItems] = useState([]);
  //const [inputText, setInputText] = useState("");
  //const [inputAmount, setInputAmount] = useState(0);
  //const [type, setType] = useState("inc");

  const currentUser = auth.currentUser;

  // useEffect(() => {
  //   getSaveData();

  // }, []);

  // useEffect(() => {
  //   getSaveData();

  // }, [date]);

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

  //firebase Expense data
  const getExpenseData = () => {
    const expenseData = db.collection("expenseItems");
    expenseData
      .where("uid", "==", currentUser.uid)
      .orderBy("date")
      .startAt(startOfMonth(date))
      .endAt(endOfMonth(date))
      .onSnapshot((query) => {
        const expenseItems = [];
        query.forEach((doc) =>
          expenseItems.push({ ...doc.data(), docId: doc.id })
        );
        setExpenseItems(expenseItems);
      });
  };

  const addExpense = (text, amount) => {
    const docId = Math.random().toString(32).substring(2);
    const date = firebase.firestore.Timestamp.now();
    db.collection("expenseItems")
      .doc(docId)
      .set({
        uid: currentUser.uid,
        text,
        amount,
        date,
      })
      .then((response) => {
        setExpenseItems([
          ...expenseItems,
          { text: inputText, amount: inputAmount, docId: docId, date: date },
        ]);
      });
  };

  const deleteExpense = (docId) => {
    db.collection("expenseItems").doc(docId).delete();
  };

  return (
    <View>
      <Header2
        date={date}
        setPrevMonth={setPrevMonth}
        setNextMonth={setNextMonth}
      />
      {/* <Balance saveTotal={saveTotal} /> */}

      <BuyGohoubi />
      <Logout />
      <BuyItemsList
        deleteExpense={deleteExpense}
        expenseItems={expenseItems}
        selectedMonth={selectedMonth}
        thisMonth={thisMonth}
      />
    </View>
  );
}
export default Home2;
