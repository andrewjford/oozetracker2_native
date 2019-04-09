import React from 'react';
import { DataTable } from 'react-native-paper';
import {
  StyleSheet,
  View,
} from 'react-native';

const listExpenses = (props) => {
    const expenses = props.expenseData;
    
    if (expenses) {
      const lineItems = expenses.map((expense) => {
        return <DataTable.Row key={expense.id}>
          <DataTable.Cell>{expense.description}</DataTable.Cell>
          <DataTable.Cell>{expense.name}</DataTable.Cell>
          <DataTable.Cell numeric>{expense.amount}</DataTable.Cell>
        </DataTable.Row>
      });

      return (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Description</DataTable.Title>
            <DataTable.Title>Category</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
          </DataTable.Header>
          {lineItems}
        </DataTable>
      )
    } else {
      return null;
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    width: "80%"
  },
  itemLeft: {
    width: "50%",
    textAlign: "left"
  },
  itemRight: {
    width: "50%",
    textAlign: "right"
  }
});

export default listExpenses;