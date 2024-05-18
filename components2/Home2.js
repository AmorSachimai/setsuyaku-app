//こちらでは今までの月で計上された節約額の合計からギフトを送ったり、
//ご褒美を購入したりすることにより引き算の処理がなされます


import { Header2 } from "./Header2";
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Logout } from "../auth/Logout";
import { BuyGohoubi } from "./BuyGohoubi";
import { Balance } from "../components/Balance";
import { db, date } from "../firebase/Firebase";
import { auth } from "../firebase/Firebase";
import {
  collection,
  setDoc,
  addDoc,
  doc,
  add,
  Timestamp,
  getAuth,
} from "firebase/firestore";
import { BuyItemsList } from "./BuyItemList";
import { TotalBuy } from "./TotalBuy";
import firebase from "firebase/app";

function Home2() {
  const [date, setDate] = useState(new Date());
  const [expenseItems, setExpenseItems] = useState([]);
  //const [expenseAmount, setExpenseAmount] = useState(0);
  const [inputText, setInputText] = useState("");
  const [inputAmount, setInputAmount] = useState(0);
  //const [type, setType] = useState("inc");
  const [type, setType] = useState("inc");

  const { currentUser } = auth.currentUser;
    const day = date.getDate();
    //setDate(new Date(year, month, day));



    const setPrevMonth = () => {
      setDate((prevDate) => {
        const prevMonth = prevDate.getMonth() - 1;
        return new Date(prevDate.getFullYear(), prevMonth, 1);
      });
    };

    const setNextMonth = () => {
      setDate((prevDate) => {
        const nextMonth = prevDate.getMonth() + 1;
        return new Date(prevDate.getFullYear(), nextMonth, 1);
      });
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

  const addExpense = (text, amount) => {
    const docId = Math.random().toString(32).substring(2);
    //const expenseItems = collection(db, "expenses");
    // 現在の日付を取得
    const date = Timestamp.now();

    // 新しいドキュメントを追加
    //adddocだめかも情報のけしかたがわからない
    addDoc(collection(db, "expenseItems"), {
      uid: getAuth().getUser(uid),
      text,
      amount,
      docId,
      date,
    }).then((response) => {
      console.log("Document written with ID: ", docId);
      let _copy = JSON.parse(JSON.stringify(expenseItems)); // 複製
      (_copy.text = text),
        (_copy.amount = amount),
        (_copy.docId = docId),
        (_copy.date = date),
        setExpenseItems(_copy);
      //console.log(_copy.text, _copy.docId, _copy.amount, _copy.date);
    });
    // console.log(
    //   expenseItems.text,
    //   expenseItems.docId,
    //   expenseItems.amount,
    //   expenseItems.date
    // );
  };

  //後でいい
  const deleteExpense = (docId) => {
    // Firestore データベースへの参照を取得

    deleteDoc(doc(collection(db, "expenses"), docId))
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <View>
      <Header2
        date={date}
        setPrevMonth={setPrevMonth}
        setNextMonth={setNextMonth}
      />
      {/* <Balance saveTotal={saveTotal} /> */}
      <TotalBuy />
      <BuyGohoubi expenseItems={expenseItems} addExpense={addExpense} />
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
