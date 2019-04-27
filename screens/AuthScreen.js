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
import { login } from '../actions/accountActions';
import Colors from '../constants/Colors';

class AuthScreen extends React.Component {
  state = {
    loading: null,
  }

  static navigationOptions = {
    header: null,
  };

  login = (account) => {
    this.setState({loading: true});
    this.props.login(account)
      .then(() => {
        this.setState({loading: false});
        if (this.props.account.token) {
          this.props.navigation.navigate('Home');
        }
      })
      .catch((error) => {
        this.setState({loading: false});
      });
  }

  renderSpinner = () => {
    if (this.state.loading) {
      return <ActivityIndicator size="large" color={Colors.tintColor} />
    } else {
      return <LoginForm login={this.login} />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSpinner()}
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
    login,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },
});
