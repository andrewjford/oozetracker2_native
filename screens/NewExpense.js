import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ExpenseInput from '../components/ExpenseInput';
import { createExpense } from '../actions/expenseActions';

class NewExpense extends React.Component {
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

  cats = () => {
    if (this.categories) {
      return this.categories.map(each => <Text>{each}</Text>);
    }
    return <Text>nope</Text>
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ExpenseInput
          title={'Create Expense'}
          expenseCategories={this.state.expenseCategories}
          createExpense={this.addExpense} />
          {this.cats()}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses.expenses,
    categories: state.categories.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createExpense,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewExpense);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
