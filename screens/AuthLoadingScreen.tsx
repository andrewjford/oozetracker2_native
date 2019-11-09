import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import { connect, DispatchProp } from "react-redux";
import { bindActionCreators } from "redux";

import { setTokenFromLocalStorage, purgeData } from "../actions/accountActions";
import { NavigationContainerProps } from "react-navigation";

interface State {}

interface DispatchProps {
  setTokenFromLocalStorage: any;
  purgeData: any;
}

type Props = NavigationContainerProps & DispatchProps

class AuthLoadingScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.navigateFromToken();
  }

  retrieveLocalStorage = async () => {
    try {
      const tokenExpiryDate = JSON.parse(
        await AsyncStorage.getItem("expiryDate")
      );
      if (tokenExpiryDate && new Date() < new Date(tokenExpiryDate)) {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          this.props.setTokenFromLocalStorage(token);
          return token;
        } else {
          this.props.purgeData();
        }
      } else {
        this.props.purgeData();
      }
    } catch (error) {
      console.log("error fetching" + error.message);
    }
  };

  navigateFromToken = async () => {
    const token = await this.retrieveLocalStorage();
    this.props.navigation.navigate(token ? "Main" : "Auth");
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setTokenFromLocalStorage,
      purgeData
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(AuthLoadingScreen);
