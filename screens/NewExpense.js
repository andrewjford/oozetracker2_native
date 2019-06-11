import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ExpenseInput from '../components/ExpenseInput';
import { createExpense } from '../actions/expenseActions';
import Colors from '../constants/Colors';

class NewExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  static navigationOptions = {
    title: 'New Expense',
    headerTintColor: Colors.tintColor,
  };

  setStateAsync = newState => {
    return new Promise(resolve => this.setState(newState, resolve));
  }

  addExpense = (newExpense) => {
    return this.setStateAsync({isLoading: true})
      .then(() => {
        return this.props.createExpense(newExpense);
      })
      .then(() => {
        this.props.navigation.navigate('Home');
      })
      .catch(error => console.log('error: '+error.message));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator size="large" color={Colors.tintColor}
          style={styles.container}/>
      );
    }
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
