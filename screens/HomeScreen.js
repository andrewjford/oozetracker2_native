import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { Button } from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Colors from "../constants/Colors";
import ExpenseList from "../components/ExpenseList";
import { logout } from "../actions/accountActions";
import { fetchRecentExpenses } from "../actions/expenseActions";
import { fetchCategories } from "../actions/categoriesActions";
import ErrorDisplay from "../components/ErrorDisplay";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      isLoading: true
    };
  }

  componentDidMount() {
    if (
      this.props.categories.length === 0 ||
      this.props.expenses.length === 0
    ) {
      Promise.all([
        this.props.fetchCategories(),
        this.props.fetchRecentExpenses()
      ]).then(() => {
        this.setState({ isLoading: false });
      });
    } else {
      this.setState({ isLoading: false });
    }
  }

  static navigationOptions = {
    title: "Recent Expenses",
    headerTintColor: Colors.tintColor
  };

  navigateToNewExpense = () => {
    this.props.navigation.navigate("NewExpense");
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    Promise.all([
      this.props.fetchCategories(),
      this.props.fetchRecentExpenses()
    ]).then(() => {
      this.setState({ refreshing: false });
    });
  };

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
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <ErrorDisplay />

          {this.renderExpenseList()}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={this.navigateToNewExpense}
          >
            New Expense
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    account: state.account,
    expenses: state.expenses.expenses,
    categories: state.categories.categories
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logout,
      fetchRecentExpenses,
      fetchCategories
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

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
