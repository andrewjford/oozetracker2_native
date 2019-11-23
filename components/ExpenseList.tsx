import React from "react";
import { DataTable } from "react-native-paper";
import currency from "currency.js";
import { NavigationContainerProps } from "react-navigation";
import { Expense } from "../types/expenseTypes";

const convertTimestampToDate = (timestamp: string): Date => {
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

interface PassedProps {
  expenseData: Expense[];
}

type Props = PassedProps & NavigationContainerProps;

const ExpenseList = (props: Props) => {
  const expenses = props.expenseData;

  if (expenses) {
    const lineItems = expenses.map(expense => {
      const date = convertTimestampToDate(expense.date);
      return (
        <DataTable.Row
          key={expense.id}
          onPress={() => props.navigation.navigate("Expense", { expense })}
        >
          <DataTable.Cell>{date.toLocaleDateString("en-US")}</DataTable.Cell>
          <DataTable.Cell>{expense.description}</DataTable.Cell>
          <DataTable.Cell numeric>
            {currency(expense.amount).format()}
          </DataTable.Cell>
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
