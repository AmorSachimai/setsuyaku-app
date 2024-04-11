//import React from "react";

export const totalCalc = (saveItems) => {
  const saveAmounts = saveItems.map((saveItem) => saveItem.amount);
  return saveAmounts.reduce((acc, cur) => (acc += cur), 0);
};
