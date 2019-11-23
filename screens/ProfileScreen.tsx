import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Text, List } from "react-native-paper";
import Colors from "../constants/Colors";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDetails } from "../actions/accountActions";

import ChangePasswordForm from "../components/ChangePasswordForm";
import { GetDetailsActionCreator, AccountState } from "../types/accountTypes";

interface DispatchProps {
  getDetails: GetDetailsActionCreator;
  account: AccountState;
}

class ProfileScreen extends React.Component<DispatchProps> {
  state = {
    showChangePassword: false,
    passwordUpdated: false
  };
  componentDidMount() {
    this.props.getDetails();
  }

  static navigationOptions = {
    title: "Profile",
    headerTintColor: Colors.tintColor
  };

  toggleChangePassword = () => {
    this.setState({ showChangePassword: !this.state.showChangePassword });
  };

  passwordUpdated = () => {
    this.setState({
      showChangePassword: false,
      passwordUpdated: true
    });

    setTimeout(() => {
      this.setState({
        passwordUpdated: false
      });
    }, 3000);
  };

  renderChangePassword = () => {
    if (this.state.showChangePassword) {
      return (
        <ChangePasswordForm
          toggleForm={this.toggleChangePassword}
          passwordUpdated={this.passwordUpdated}
        />
      );
    }

    return (
      <View style={styles.buttonContainer}>
        {this.renderSuccessMessage()}
        <View style={styles.horizontalButtons}>
          <Button
            mode="contained"
            onPress={this.toggleChangePassword}
            style={styles.button}
          >
            <Text style={styles.buttonContent}>Change Password</Text>
          </Button>
        </View>
      </View>
    );
  };

  renderSuccessMessage = () => {
    if (this.state.passwordUpdated) {
      return (
        <Text style={styles.subtleText}>Password Updated Successfully!</Text>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <List.Section>
          <List.Item
            title="Email"
            right={() => (
              <Text style={styles.rightText}>{this.props.account.email}</Text>
            )}
          />
          <List.Item
            title="Name"
            right={() => (
              <Text style={styles.rightText}>{this.props.account.name}</Text>
            )}
          />
        </List.Section>
        {this.renderChangePassword()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  button: {
    margin: 8,
    borderRadius: 4,
    alignSelf: "center"
  },
  buttonContent: {
    fontWeight: "600",
    fontSize: 18,
    color: "white"
  },
  buttonContentOutline: {
    fontWeight: "600",
    fontSize: 18,
    color: Colors.tintColor
  },
  inputContainerStyle: {
    margin: 8,
    width: "85%"
  },
  buttonContainer: {
    marginVertical: 8,
    justifyContent: "center"
  },
  horizontalButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  rightText: {
    fontSize: 16,
    alignSelf: "center"
  },
  scrollContainer: {
    height: "100%",
    width: "90%",
    alignSelf: "center"
  },
  subtleText: {
    alignSelf: "center",
    color: "gray"
  }
});

const mapStateToProps = state => {
  return {
    account: state.account
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDetails
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
