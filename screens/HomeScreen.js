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

import ExpenseList from '../components/ExpenseList';
import { logout } from '../actions/accountActions';
import { fetchRecentExpenses } from '../actions/expenseActions';
import { fetchCategories } from '../actions/categoriesActions';

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
          <ExpenseList expenseData={this.props.expenses} navigation={this.props.navigation}/>
        </ScrollView>
        <Button mode="contained" onPress={this.navigateToNewExpense}>New Expense</Button>
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
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  header: {
    textAlign: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
