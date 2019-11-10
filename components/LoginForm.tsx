import React from "react";

import { StyleSheet, View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import Colors from "../constants/Colors";
import { LoginFormState } from "../types/formTypes";

interface DispatchProps {
  login: any;
  openSignup: any;
}

type Props = DispatchProps;

export default class LoginForm extends React.Component<Props, LoginFormState> {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  submit = () => {
    this.props.login(this.state);
  };

  openSignup = () => {
    this.props.openSignup();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputContainerStyle}
          label="Email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />

        <TextInput
          style={styles.inputContainerStyle}
          label="Password"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          secureTextEntry={true}
        />

        <Button mode="contained" onPress={this.submit} style={styles.button}>
          <Text style={styles.buttonContent}>Login</Text>
        </Button>
        <Button mode="outlined" onPress={this.openSignup} style={styles.button}>
          <Text style={styles.buttonContentOutline}>Sign Up</Text>
        </Button>
      </View>
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
    width: "30%",
    borderRadius: 4
  },
  buttonContent: {
    fontWeight: "600",
    fontSize: 22,
    color: "white",
  },
  buttonContentOutline: {
    fontWeight: "600",
    fontSize: 22,
    color: Colors.tintColor,
  },
  inputContainerStyle: {
    margin: 8,
    width: "85%"
  },
});
