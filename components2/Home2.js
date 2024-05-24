// //こちらでは今までの月で計上された節約額の合計からギフトを送ったり、
// //ご褒美を購入したりすることにより引き算の処理がなされます

// import { Header2 } from "./Header2";
// import React, { useState, useContext, useEffect } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { Logout } from "../auth/Logout";
// import { BuyGohoubi } from "./BuyGohoubi";
// import { Balance } from "../components/Balance";
// import { db, date } from "../firebase/Firebase";
// import { auth } from "../firebase/Firebase";
// import {
//   collection,
//   setDoc,
//   addDoc,
//   doc,
//   add,
//   Timestamp,

// } from "firebase/firestore";

// import { BuyItemsList } from "./BuyItemList";
// import { TotalBuy } from "./TotalBuy";
// import firebase from "firebase/app";
// import { getAuth } from "firebase/auth";

// function Home2() {
//   const [date, setDate] = useState(new Date());
//   const [expenseItems, setExpenseItems] = useState([]);
//   //const [expenseAmount, setExpenseAmount] = useState(0);
//   const [inputText, setInputText] = useState("");
//   const [inputAmount, setInputAmount] = useState(0);
//   //const [type, setType] = useState("inc");
//   const [type, setType] = useState("inc");

//   const { currentUser } = getAuth().currentUser;
//     const day = date.getDate();
//     //setDate(new Date(year, month, day));

//     const setPrevMonth = () => {
//       setDate((prevDate) => {
//         const prevMonth = prevDate.getMonth() - 1;
//         return new Date(prevDate.getFullYear(), prevMonth, 1);
//       });
//     };

//     const setNextMonth = () => {
//       setDate((prevDate) => {
//         const nextMonth = prevDate.getMonth() + 1;
//         return new Date(prevDate.getFullYear(), nextMonth, 1);
//       });
//     };

//   //get first date of the month
//   const startOfMonth = (date) => {
//     return new Date(date.getFullYear(), date.getMonth(), 1);
//   };

//   //get last date of this month
//   const endOfMonth = (date) => {
//     return new Date(date.getFullYear(), date.getMonth() + 1, 0);
//   };

//   //operate add form and income/expense list
//   const selectedMonth = date.getMonth() + 1;
//   const today = new Date();
//   const thisMonth = today.getMonth() + 1;

//   //firebase Expense data
//   // const getExpenseData = () => {
//   //   const expenseData = db.collection("expenseItems");
//   //   expenseData
//   //     .where("uid", "==", currentUser.uid)
//   //     .orderBy("date")
//   //     .startAt(startOfMonth(date))
//   //     .endAt(endOfMonth(date))
//   //     .onSnapshot((query) => {
//   //       const expenseItems = [];
//   //       query.forEach((doc) =>
//   //         expenseItems.push({ ...doc.data(), docId: doc.id })
//   //       );
//   //       setExpenseItems(expenseItems);
//   //     });
//   // };

//   const addExpense = (text, amount) => {
//     const docId = Math.random().toString(32).substring(2);
//     //const expenseItems = collection(db, "expenses");
//     // 現在の日付を取得
//     const date = Timestamp.now();
//     //これできてないよ//////////////////////////////////////////////////////////////////////////////////////

//     //const uid = currentUser.get("uid");
//      // 新しいドキュメントを追加
//      //adddocだめかも情報のけしかたがわからない
//      addDoc(collection(db, "expenseItems"), {
//        uid : currentUser.uid,
//        text,
//        amount,
//        docId,
//        date,
//      }).then((response) => {
//        console.log("Document written with ID: ", docId);
//        let _copy = JSON.parse(JSON.stringify(expenseItems)); // 複製
//        (_copy.text = text),
//          (_copy.amount = amount),
//          (_copy.docId = docId),
//          (_copy.date = date),
//          setExpenseItems(_copy);
//        //console.log(_copy.text, _copy.docId, _copy.amount, _copy.date);
//      });
//     // console.log(
//     //   expenseItems.text,
//     //   expenseItems.docId,
//     //   expenseItems.amount,
//     //   expenseItems.date
//     // );
//   };

//   //後でいい
//   const deleteExpense = (docId) => {
//     // Firestore データベースへの参照を取得

//     deleteDoc(doc(collection(db, "expenses"), docId))
//       .then(() => {
//         console.log("Document successfully deleted!");
//       })
//       .catch((error) => {
//         console.error("Error removing document: ", error);
//       });
//   };

//   return (
//     <View>
//       <Header2
//         date={date}
//         setPrevMonth={setPrevMonth}
//         setNextMonth={setNextMonth}
//       />
//       {/* <Balance saveTotal={saveTotal} /> */}
//       <TotalBuy />
//       <BuyGohoubi expenseItems={expenseItems} addExpense={addExpense} />
//       <Logout />
//       <BuyItemsList
//         deleteExpense={deleteExpense}
//         expenseItems={expenseItems}
//         selectedMonth={selectedMonth}
//         thisMonth={thisMonth}
//       />
//     </View>
//   );
// }
// export default Home2;

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
  const [type, setType] = useState("inc");
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

  const getExpense = () => {
    const expenseData = collection(db, "expenseItems");
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

  const addExpense = async (text, amount, time) => {
    if (!currentUser) {
      console.error("User is not authenticated");
      return;
    }

    const uid = currentUser.uid;
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


  
  const expenseTotal = totalCalc(expenseItems);

  return (
    <View>
       <Text>{expenseTotal}</Text> 
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
      />
    </View>
  );
}

export default Home2;
