import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { updateAccount } from "../actions/accountActions";
import Colors from "../constants/Colors";
import ErrorDisplay from "./ErrorDisplay";
import ErrorHandling from "../services/ErrorHandling";

class ChangePasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      errors: [],
      updated: false
    };
  }

  clearErrors = () => {
    this.setState({ errors: [] });
  };

  handleSubmit = () => {
    const errors = this.validateForm();
    if (errors.length > 0) {
      this.setState({
        errors
      });
      return;
    } else {
      this.setState({
        errors: []
      });
    }
    this.props
      .updateAccount(this.state)
      .then(result => {
        this.setState({
          errors: [],
          updated: true
        });
        this.props.passwordUpdated();
      })
      .catch(error => {
        const errors = ErrorHandling.toErrorArray(error);

        this.setState({
          errors
        });
      });
  };

  validateForm = () => {
    const errors = [];

    if (this.state.oldPassword === "") {
      errors.push("Old password must be completed");
    }

    if (this.state.newPassword === "") {
      errors.push("New password must be completed");
    }

    if (this.state.confirmPassword === "") {
      errors.push("Confirmed password must be completed");
    }

    if (this.state.newPassword !== this.state.confirmPassword) {
      errors.push("Confirmed password and new password must be equal");
    }

    if (this.state.newPassword === this.state.oldPassword) {
      errors.push("New password must be different from old password");
    }

    return errors;
  };

  render() {
    return (
      <View style={styles.container}>
        <ErrorDisplay
          errors={this.state.errors}
          clearErrors={this.clearErrors}
        />
        <View style={styles.inputFields}>
          <TextInput
            style={styles.inputContainerStyle}
            label="Old Password"
            value={this.state.oldPassword}
            selectTextOnFocus={true}
            onChangeText={oldPassword => this.setState({ oldPassword })}
            underlineColor={Colors.accentColor}
            selectionColor={Colors.secondaryColor}
            secureTextEntry={true}
          />

          <TextInput
            style={styles.inputContainerStyle}
            label="New Password"
            value={this.state.newPassword}
            selectTextOnFocus={true}
            onChangeText={newPassword => this.setState({ newPassword })}
            underlineColor={Colors.accentColor}
            selectionColor={Colors.secondaryColor}
            secureTextEntry={true}
          />

          <TextInput
            style={styles.inputContainerStyle}
            label="Confirm Password"
            value={this.state.confirmPassword}
            selectTextOnFocus={true}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            underlineColor={Colors.accentColor}
            selectionColor={Colors.secondaryColor}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.horizontalButtons}>
            <Button
              onPress={this.props.toggleForm}
              mode="outlined"
              style={styles.button}
            >
              Cancel
            </Button>

            <Button
              onPress={this.handleSubmit}
              mode="contained"
              style={styles.button}
            >
              Submit
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateAccount
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(ChangePasswordForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  inputFields: {
    paddingVertical: 16
  },
  inputContainerStyle: {
    margin: 8
  },
  button: {
    width: "40%",
    alignSelf: "center"
  },
  buttonContainer: {
    marginVertical: 8,
    justifyContent: "center"
  },
  horizontalButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});
