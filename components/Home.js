// home.js
import { db } from "../firebase/Firebase";
import { Header } from "./Header";
import { Balance } from "./Balance";
import GoalAmountForm from "./GoalAmountForm";
import { AddItems } from "./AddItems";
import { SaveItemsList } from "./SaveItemList";

import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { TotalSave } from "./TotalSave"; // import { TotalBuy } from "./TotalBuy";
import { totalCalc } from "./TotalSave"; // import { totalCalc } from "./TotalExpense";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

function Home() {
  const [date, setDate] = useState(new Date());
  const [saveItems, setSaveItems] = useState([]);
  const [inputText, setInputText] = useState("");
  const [inputAmount, setInputAmount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [goalAmount, setGoalAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchData = async () => {
        try {
          const documentSnapshot = await getDoc(
            doc(db, "goalAmounts", currentUser.uid),
          );
          if (documentSnapshot.exists()) {
            setGoalAmount(documentSnapshot.data().amount);
          }
        } catch (error) {
          console.error("Error fetching goal amount: ", error);
        }
      };
      fetchData();
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && goalAmount !== "") {
      const saveData = async () => {
        try {
          await setDoc(doc(db, "goalAmounts", currentUser.uid), {
            amount: goalAmount,
          });
        } catch (error) {
          console.error("Error saving goal amount: ", error);
        }
      };
      saveData();
    }
  }, [goalAmount, currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchTotal(currentUser.uid, date.getMonth() + 1, selectedYear); // ユーザー認証後に合計を取得
    }
  }, [date, selectedYear, currentUser]);

  const fetchTotal = async (uid, selectedMonth, selectedYear) => {
    try {
      const totalAmount = await totalCalc(uid, selectedMonth, selectedYear);
      setTotal(totalAmount);
    } catch (error) {
      console.error("Error calculating total amount:", error);
    }
  };

  const setPrevMonth = () => {
    setDate((prevDate) => {
      const prevMonth = prevDate.getMonth() - 1;
      const year =
        prevMonth === -1 ? prevDate.getFullYear() - 1 : prevDate.getFullYear();
      setSelectedYear(year);
      return new Date(year, prevMonth === -1 ? 11 : prevMonth, 1);
    });
  };

  const setNextMonth = () => {
    setDate((prevDate) => {
      const nextMonth = prevDate.getMonth() + 1;
      const year =
        nextMonth === 12 ? prevDate.getFullYear() + 1 : prevDate.getFullYear();
      setSelectedYear(year);
      return new Date(year, nextMonth === 12 ? 0 : nextMonth, 1);
    });
  };


  const selectedMonth = date.getMonth() + 1;
  const today = new Date();
  const thisMonth = today.getMonth() + 1;
  
  // 節約額の合計もべつで表示出来たらいいかも？
  // const saveTotal = totalCalc(saveItems);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!currentUser) {
    console.error("User is not authenticated");
    return null;
  }

  const uid = currentUser.uid;

  const addSave = async (text, amount, time) => {
    const docId = Math.random().toString(32).substring(2);
    const date = Timestamp.now();
    try {
      await addDoc(collection(db, "saveItems"), {
        uid,
        text,
        amount,
        time,
        docId,
        date,
      });

      const newSaveItem = { uid, text, amount, docId, date };
      setSaveItems((prevItems) => [...prevItems, newSaveItem]);
      console.log("Document written with ID: ", docId);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deleteSave = async (docId) => {
    try {
      await deleteDoc(doc(db, "saveItems", docId));
      setSaveItems((prevItems) =>
        prevItems.filter((item) => item.docId !== docId),
      );
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <View>
      <View>
        <Header
          date={date}
          setPrevMonth={setPrevMonth}
          setNextMonth={setNextMonth}
          selectedYear={selectedYear}
        />
        <ScrollView>
          <GoalAmountForm
            goalAmount={goalAmount}
            setGoalAmount={setGoalAmount}
          />
          <Balance saveTotal={total} />
          <AddItems
            saveItems={saveItems}
            addSave={addSave}
            inputText={inputText}
            setInputText={setInputText}
            inputAmount={inputAmount}
            setInputAmount={setInputAmount}
            selectedMonth={selectedMonth}
            thisMonth={thisMonth}
          />
          <SaveItemsList
            deleteSave={deleteSave}
            saveItems={saveItems}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            thisMonth={thisMonth}
            uid={uid}
          />
        </ScrollView>
      </View>
    </View>
  );
}

export default Home;

// import { db } from "../firebase/Firebase";
// import { Header } from "./Header";
// import { Balance } from "./Balance";
// import AddSavingForm from './AddSavingForm';
// import GoalAmountForm from "./GoalAmountForm";
// import { AddItems } from "./AddItems";
// import { SaveItemsList } from "./SaveItemList";

// import {
//   collection,
//   addDoc,
//   doc,
//   Timestamp,
//   deleteDoc,
// } from "firebase/firestore";
// import React, { useState, useContext, useEffect, useRef } from "react";
// import { StyleSheet, Text, View , ScrollView, Animated } from "react-native";
// import { totalCalc } from "./TotalSave";
// //import { AuthContext } from "../auth/AuthProvider";
// import { Logout } from "../auth/Logout";
// import firebase from "firebase/app";
// import "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "@firebase/auth";

// function Home() {
//   const [date, setDate] = useState(new Date());
//   const [saveItems, setSaveItems] = useState([]);
//   //const [expenseItems, setExpenseItems] = useState([]);
//   const [inputText, setInputText] = useState("");
//   const [inputAmount, setInputAmount] = useState(0);
//   //const [type, setType] = useState("inc");

//   const [currentUser, setCurrentUser] = useState(null);

//   const [loading, setLoading] = useState(true); // 新しい状態を追加

//  useEffect(() => {
//    const auth = getAuth();
//    const unsubscribe = onAuthStateChanged(auth, (user) => {
//      if (user) {
//        setCurrentUser(user);
//      } else {
//        setCurrentUser(null);
//      }
//      setLoading(false); // ロード完了
//    });

//    return () => unsubscribe();
//  }, []);
//   // const { currentUser } = useContext(AuthContext);

//     // useEffect(() => {
//     //   getSaveData();

//     // }, []);

//     // useEffect(() => {
//     //   getSaveData();

//     // }, [date]);

//   //for Header
//   const setPrevMonth = () => {
//     const year = date.getFullYear();
//     const month = date.getMonth() - 1;
//     const day = date.getDate();
//     setDate(new Date(year, month, day));
//   };

//   const setNextMonth = () => {
//     const year = date.getFullYear();
//     const month = date.getMonth() + 1;
//     const day = date.getDate();
//     setDate(new Date(year, month, day));
//   };

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
//   const saveTotal = totalCalc(saveItems);

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   // uidのために直したい
//   if (!currentUser) {
//     console.error("User is not authenticated");
//     return;
//   }
//   const uid = currentUser.uid;
//   // uidのために直したい　ここまで

//   // ここから　home2より

//   const addSave = async (text, amount, time) => {
//     const docId = Math.random().toString(32).substring(2);
//     const date = Timestamp.now();
//     try {
//       await addDoc(collection(db, "saveItems"), {
//         uid,
//         text,
//         amount,
//         time,
//         docId,
//         date,
//       });

//       const newSaveItem = { uid, text, amount, docId, date };
//       setSaveItems((prevItems) => [...prevItems, newSaveItem]);
//       console.log("Document written with ID: ", docId);
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };
//   //できてる
//   const deleteSave = async (docId) => {
//     try {
//       await deleteDoc(doc(db, "saveItems", docId));
//       setSaveItems((prevItems) =>
//         prevItems.filter((item) => item.docId !== docId)
//       );
//       console.log("Document successfully deleted!");
//     } catch (error) {
//       console.error("Error removing document: ", error);
//     }
//   };
//   // ここまで　home2より

//   // // 目標金額
//   // const setGoal = async ( amount ) => {
//   //   try {
//   //     await addDoc(collection(db, "saveGoal"), {

//   //     });
//   //   }
//   // };

//   // const scrollY = useRef(new Animated.Value(0)).current;
//   return (
//     // <ScrollView>
//       <View>
//         <View>
//           <Header
//             date={date}
//             setPrevMonth={setPrevMonth}
//             setNextMonth={setNextMonth}
//           />
//           <ScrollView>
//             <GoalAmountForm
//           />
//           <Balance
//             saveTotal={saveTotal}
//           />
//           <AddItems
//             saveItems={saveItems}
//             addSave={addSave}
//             inputText={inputText}
//             setInputText={setInputText}
//             inputAmount={inputAmount}
//             setInputAmount={setInputAmount}
//             selectedMonth={selectedMonth}
//             thisMonth={thisMonth}
//           />

//           {/* <AddSavingForm
//           /> */}

//           <SaveItemsList
//             deleteSave={deleteSave}
//             saveItems={saveItems}
//             selectedMonth={selectedMonth}
//             thisMonth={thisMonth}
//             uid={uid}
//           />
//           </ScrollView>

//         </View>
//       </View>
//     // </ScrollView>

//   );
// }
// export default Home;
