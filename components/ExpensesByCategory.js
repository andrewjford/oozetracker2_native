import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import ExpenseList from "./ExpenseList";

class ExpensesByCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: props.navigation.getParam("expenses", null)
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ExpenseList
          expenseData={this.state.expenses}
          navigation={this.props.navigation}
        />
      </View>
    );
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
