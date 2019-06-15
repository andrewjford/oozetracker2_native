import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginForm from '../components/LoginForm';
import { loginCallout } from '../actions/accountActions';
import { fetchRecentExpenses } from '../actions/expenseActions';
import { fetchCategories } from '../actions/categoriesActions';
import Colors from '../constants/Colors';
import ErrorDisplay from '../components/ErrorDisplay';
import ErrorHandling from '../services/ErrorHandling';

class AuthScreen extends React.Component {
  state = {
    loading: null,
    errors: [],
  }

  static navigationOptions = {
    header: null,
  };

  login = (account) => {
    this.setState({loading: true});
    this.props.loginCallout(account)
      .then(() => this.props.fetchRecentExpenses())
      .then(() => this.props.fetchCategories())
      .then(() => {
        this.setState({loading: false});
        if (this.props.account.token) {
          this.props.navigation.navigate('Home');
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        this.setState({errors: ErrorHandling.toErrorArray(error)});
      });
  }

  loginForm = () => {
    if (this.state.loading) {
      return <ActivityIndicator size="large" color={Colors.tintColor} />
    } else {
      return <LoginForm login={this.login} />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ErrorDisplay errors={this.state.errors}/>
        <View style={styles.content}>
          {this.loginForm()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginCallout,
    fetchRecentExpenses,
    fetchCategories
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 9,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    height: "10%",
  },
  errorContainer: {
    backgroundColor: "blue",
  }
});
