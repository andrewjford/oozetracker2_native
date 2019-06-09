import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ExpenseInput from '../components/ExpenseInput';
import { createExpense } from '../actions/expenseActions';
import Colors from '../constants/Colors';

class NewExpense extends React.Component {
  static navigationOptions = {
    title: 'New Expense',
    headerTintColor: Colors.tintColor,
  };

  addExpense = (newExpense) => {
    return this.props.createExpense(newExpense)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => console.log('error: '+error.message));
  }

  render() {
    return (
      <ExpenseInput
        title={'Create Expense'}
        categories={this.props.categories}
        createExpense={this.addExpense} />
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
