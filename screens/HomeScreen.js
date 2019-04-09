import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Headline } from 'react-native-paper';

import ExpenseList from '../components/ExpenseList';
import { logout } from '../actions/accountActions';

class HomeScreen extends React.Component {
  navigateToNewExpense = () => {
    this.props.navigation.navigate('NewExpense');
  }

  render() {
    return (
      <View style={styles.container}>
        <Headline style={styles.header}>Recent Expenses</Headline>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <ExpenseList expenseData={this.props.expenses}/>
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
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
