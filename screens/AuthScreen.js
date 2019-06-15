import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginForm from '../components/LoginForm';
import { login } from '../actions/accountActions';
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
    this.props.login(account)
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
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.topSection}>
            <View style={styles.imageContainer}>
              <Image
                resizeMode={"center"}
                style={styles.image}
                source={require('../assets/images/fullblob.png')}
              />
            </View>
            <ErrorDisplay errors={this.state.errors} />
          </View>
          <View style={styles.formSection}>
            {this.loginForm()}
          </View>
        </KeyboardAvoidingView>
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
    login,
    fetchRecentExpenses,
    fetchCategories
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 5,
    paddingHorizontal: 24,
  },
  image: {
    flex:1,
    height: undefined,
    width: undefined,
    justifyContent: "flex-end",
  },
  topSection: {
    flex: 1
  },
  formSection: {
    flex: 1
  },
});
