import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Colors from '../constants/Colors';
import ExpenseList from '../components/ExpenseList';
import { logout } from '../actions/accountActions';
import { fetchRecentExpenses } from '../actions/expenseActions';
import { fetchCategories } from '../actions/categoriesActions';
import ErrorDisplay from '../components/ErrorDisplay';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };
  }

  static navigationOptions = {
    title: 'Recent Expenses',
  };

  navigateToNewExpense = () => {
    this.props.navigation.navigate('NewExpense');
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    Promise.all([this.props.fetchCategories(), this.props.fetchRecentExpenses()])
      .then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}/>
                    }>
          <ErrorDisplay/>
          <ExpenseList expenseData={this.props.expenses} navigation={this.props.navigation}/>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button mode="contained" style={styles.button} onPress={this.navigateToNewExpense}>
            New Expense
          </Button>
        </View>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    account: state.account,
    expenses: state.expenses.expenses,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout,
    fetchRecentExpenses,
    fetchCategories,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    marginVertical: 8,
    minWidth: "35%",
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    height: "10%",
    marginVertical: 8,
    borderTopColor: Colors.accentColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
  }
});
