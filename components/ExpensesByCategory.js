import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import ExpenseList from "./ExpenseList";

class ExpensesByCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: props.navigation.getParam("expenses", null),
      title: props.navigation.getParam("title", null) || null
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      headerTintColor: Colors.tintColor
    };
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <ExpenseList
          expenseData={this.state.expenses}
          navigation={this.props.navigation}
        />
      </ScrollView>
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
