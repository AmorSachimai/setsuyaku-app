

export const totalCalc = (expenseItems) => {
  const expenseAmounts = expenseItems.map((expenseItem) => parseFloat(expenseItem.amount));
  return expenseAmounts.reduce((acc, cur) => (acc += cur),0);
};

// export const totalCalcByUID = (expenseItems) => {
//   const totalsByUID = {};

//   expenseItems.forEach((expenseItem) => {
//     const amount = parseFloat(expenseItem.amount);
//     const { uid } = expenseItem;

//     if (!totalsByUID[uid]) {
//       totalsByUID[uid] = 0;
//     }

//     totalsByUID[uid] += amount;
//   });

//   return totalsByUID;
// };
