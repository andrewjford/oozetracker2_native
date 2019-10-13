import React from "react";
import { DataTable } from "react-native-paper";
import currency from "currency.js";

convertTimestampToDate = timestamp => {
  const recordDate = new Date();
  const splitDate = timestamp
    .slice(0, 10)
    .split("-")
    .map(each => parseInt(each));
  recordDate.setFullYear(splitDate[0]);
  recordDate.setMonth(splitDate[1] - 1);
  recordDate.setDate(splitDate[2]);
  return recordDate;
};

const ExpenseList = props => {
  const expenses = props.expenseData;

  if (expenses) {
    const lineItems = expenses.map(expense => {
      const date = convertTimestampToDate(expense.date);
      return (
        <DataTable.Row
          key={expense.id}
          onPress={() => props.navigation.navigate("Expense", { expense })}
        >
          <DataTable.Cell>
            {date.toLocaleDateString("en-US")}
          </DataTable.Cell>
          <DataTable.Cell>{expense.description}</DataTable.Cell>
          <DataTable.Cell numeric>{currency(expense.amount).format()}</DataTable.Cell>
        </DataTable.Row>
      );
    });

    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Description</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
        </DataTable.Header>
        {lineItems}
      </DataTable>
    );
  } else {
    return null;
  }
};

export default ExpenseList;
