import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setTokenFromLocalStorage, setTokenAndFetchData } from '../actions/accountActions';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  retrieveLocalStorage = async () => {
    try {
      const tokenExpiryDate = JSON.parse(await AsyncStorage.getItem('expiryDate'));
      if (tokenExpiryDate && Date.now() < new Date(tokenExpiryDate)) {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          console.log('token '+token);
          this.props.setTokenAndFetchData(token);
        }
      }
    } catch (error) {
      console.log('error fetching' + error.message);
    }
  };
  
  retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log('no token');
    }
  };

  _bootstrapAsync = async () => {
    const token = this.retrieveLocalStorage();
    this.props.navigation.navigate(token ? 'Main' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setTokenFromLocalStorage,
    setTokenAndFetchData
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(AuthLoadingScreen);