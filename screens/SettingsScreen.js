import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { logout } from "../actions/accountActions";

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accountExpanded: true
    };
  }

  handleAccountCollapse = () => {
    this.setState(state => ({ accountExpanded: !state.accountExpanded }));
  };

  handleLogout = () => {
    this.props.logout().then(() => {
      this.props.navigation.navigate("AuthLoading");
    });
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
          <List.Item title="Profile" />
        </List.Accordion>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logout
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(SettingsScreen);
