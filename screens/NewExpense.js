import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import ExpenseInput from '../components/ExpenseInput';

export default class NewExpense extends React.Component {
  static navigationOptions = {
    title: 'New Expense',
  };

  state = {
    expenseCategories: [
      'Groceries',
      'Dining Out',
      'Entertainment',
      'Transportation',
      'Apparel',
      'Health',
      'Alcohol'
    ]
  };

  addExpense = () => {
    
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Input stuff</Text>
        <ExpenseInput
          title={'Create Expense'}
          expenseCategories={this.state.expenseCategories}
          createExpense={this.addExpense} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
