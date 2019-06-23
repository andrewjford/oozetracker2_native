import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import Colors from "../constants/Colors";
import ExpenseList from "./ExpenseList";

class ExpensesByCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    // fetch expenses by category by month
  }

  renderExpenseList = () => {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator
          size="large"
          color={Colors.tintColor}
          style={styles.container}
        />
      );
    } else {
      return (
        <ExpenseList
          expenseData={this.props.expenses}
          navigation={this.props.navigation}
        />
      );
    }
  };

  render() {
    return <View style={styles.container}>{this.renderExpenseList()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  button: {
    marginVertical: 8,
    minWidth: "35%",
    alignSelf: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    height: "10%",
    marginVertical: 8,
    borderTopColor: Colors.accentColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: "center"
  }
});

export default ExpensesByCategory;
