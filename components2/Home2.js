// //こちらでは今までの月で計上された節約額の合計からギフトを送ったり、
// //ご褒美を購入したりすることにより引き算の処理がなされます


import { Header2 } from "./Header2";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Logout } from "../auth/Logout";
import { BuyGohoubi } from "./BuyGohoubi";
import { Balance } from "../components/Balance";
import { db } from "../firebase/Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  doc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { BuyItemsList } from "./BuyItemList";
import { TotalBuy } from "./TotalBuy";
import { totalCalc } from "./TotalExpense";

function Home2() {
  const [date, setDate] = useState(new Date());
  const [expenseItems, setExpenseItems] = useState([]);
  const [inputText, setInputText] = useState("");
  const [inputAmount, setInputAmount] = useState(0);
  
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

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

  const startOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const endOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  const selectedMonth = date.getMonth() + 1;
  const today = new Date();
  const thisMonth = today.getMonth() + 1;

  // const getExpense = () => {
  //   const expenseData = collection(db, "expenseItems");
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
  if (!currentUser) {
    console.error("User is not authenticated");
    return;
  }
  const uid = currentUser.uid;

  const addExpense = async (text, amount, time) => {
    const docId = Math.random().toString(32).substring(2);
    const date = Timestamp.now();

    try {
      await addDoc(collection(db, "expenseItems"), {
        uid,
        text,
        amount,
        time,
        docId,
        date,
      });

      const newExpenseItem = { uid, text, amount, docId, date };
      setExpenseItems((prevItems) => [...prevItems, newExpenseItem]);
      console.log("Document written with ID: ", docId);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  //できてる
  const deleteExpense = async (docId) => {
    try {
      await deleteDoc(doc(db, "expenseItems", docId));
      setExpenseItems((prevItems) =>
        prevItems.filter((item) => item.docId !== docId)
      );
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  //const expenseTotal = totalCalc(uid)


const expense = async (uid) => {
  try {
    const total = await totalCalc(uid);
    console.log("Total amount:", total);
    return total;
  } catch (error) {
    console.error("Error calculating total amount:", error);
  }
};


const expenseTotal = async (uid) => {
  try {
    const expenseTotal = await expense(uid);
    console.log("Total amount from testFunction:", total);
    return expenseTotal;
  } catch (error) {
    console.error("Error in testFunction:", error);
  }
};






  return (
    <View>
      <Header2
        date={date}
        setPrevMonth={setPrevMonth}
        setNextMonth={setNextMonth}
      />
      <TotalBuy expenseTotal={expenseTotal} />
      <BuyGohoubi
        expenseItems={expenseItems}
        addExpense={addExpense}
        inputText={inputText}
        setInputText={setInputText}
        inputAmount={inputAmount}
        setInputAmount={setInputAmount}
        selectedMonth={selectedMonth}
        thisMonth={thisMonth}
      />
      <Logout />

      <BuyItemsList
        deleteExpense={deleteExpense}
        expenseItems={expenseItems}
        selectedMonth={selectedMonth}
        thisMonth={thisMonth}
        uid={uid}
      />
    </View>
  );
}

export default Home2;
