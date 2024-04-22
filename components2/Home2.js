//こちらでは今までの月で計上された節約額の合計からギフトを送ったり、
//ご褒美を購入したりすることにより引き算の処理がなされます


import { auth } from "../firebase/Firebase"
import { Header2 } from "./Header2";
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Logout } from "../auth/Logout";
import { BuyGohoubi } from "./BuyGohoubi";
import { Balance } from "../components/Balance";


function Home2() {

  const [date, setDate] = useState(new Date());
  const [saveItems, setSaveItems] = useState([]);
  //const [expenseItems, setExpenseItems] = useState([]);
  //const [inputText, setInputText] = useState("");
  //const [inputAmount, setInputAmount] = useState(0);
  //const [type, setType] = useState("inc");

  // const { currentUser } = useContext(AuthContext);

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
  //const saveTotal = totalCalc(saveItems);
  return (
    
      <View>
        <Header2 />
        {/* <Balance saveTotal={saveTotal} /> */}

        <BuyGohoubi />
        <Logout />
      </View>
    
  );
}
export default Home2;
