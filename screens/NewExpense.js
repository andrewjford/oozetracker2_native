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

  addExpense = (newExpense) => {
    this.props.createExpense(newExpense)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => console.log('error: '+error.message));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ExpenseInput
          title={'Create Expense'}
          categories={this.props.categories}
          createExpense={this.addExpense} />
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
