import React from 'react';
import { DataTable } from 'react-native-paper';

const listExpenses = (props) => {
    const expenses = props.expenseData;
    
    if (expenses) {
      const lineItems = expenses.map((expense) => {
        const date = new Date(expense.date);
        return (
          <DataTable.Row key={expense.id} onPress={() => props.navigation.navigate("Expense", { expense })}>
            <DataTable.Cell>{new Date(expense.date).toLocaleDateString('en-US', {timeZone: 'UTC'})}</DataTable.Cell>
            <DataTable.Cell>{expense.description}</DataTable.Cell>
            <DataTable.Cell numeric>{expense.amount}</DataTable.Cell>
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
      )
    } else {
      return null;
    }
  }

export default listExpenses;