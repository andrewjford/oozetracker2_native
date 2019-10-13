import React from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Colors from "../constants/Colors";
import { logout, purgeData } from "../actions/accountActions";

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accountExpanded: true
    };
  }

  static navigationOptions = {
    title: "Settings",
    headerTintColor: Colors.tintColor
  };

  handleAccountCollapse = () => {
    this.setState(state => ({ accountExpanded: !state.accountExpanded }));
  };

  handleLogout = () => {
    this.props
      .logout()
      .then(() => {
        return this.props.purgeData();
      })
      .then(() => {
        this.props.navigation.navigate("AuthLoading");
      });
  };

  openProfile = () => {
    this.props.navigation.navigate("Profile");
  };

  render() {
    return (
      <ScrollView>
        <List.Accordion
          title="Account"
          expanded={this.state.accountExpanded}
          onPress={this.handleAccountCollapse}
        >
          <List.Item title="Logout" onPress={this.handleLogout} />
          <List.Item title="Profile" onPress={this.openProfile} />
        </List.Accordion>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logout,
      purgeData
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(SettingsScreen);
