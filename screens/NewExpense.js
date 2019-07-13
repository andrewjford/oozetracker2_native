import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ExpenseInput from "../components/ExpenseInput";
import { createExpense } from "../actions/expenseActions";
import Colors from "../constants/Colors";
import ErrorDisplay from "../components/ErrorDisplay";
import ErrorHandling from "../services/ErrorHandling";

class NewExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      errors: []
    };
  }

  static navigationOptions = {
    title: "New Expense",
    headerTintColor: Colors.tintColor
  };

  setStateAsync = newState => {
    return new Promise(resolve => this.setState(newState, resolve));
  };

  addExpense = newExpense => {
    return this.setStateAsync({ isLoading: true })
      .then(() => {
        return this.props.createExpense(newExpense);
      })
      .then(() => {
        this.props.navigation.navigate("Home");
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          errors: ErrorHandling.toErrorArray(error)
        });
      });
  };

  clearErrors = () => {
    this.setState({ errors: [] });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator
          size="large"
          color={Colors.tintColor}
          style={styles.container}
        />
      );
    }
    // need to fix height of error display
    return (
      <View style={styles.container}>
        <ErrorDisplay
          style={styles.error}
          errors={this.state.errors}
          clearErrors={this.clearErrors}
        />
        <ExpenseInput
          title={"Create Expense"}
          categories={this.props.categories}
          createExpense={this.addExpense}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    expenses: state.expenses.expenses,
    categories: state.categories.categories
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createExpense
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewExpense);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  error: {
    height: 32
  }
});
