import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

export default class LoginInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: null,
    };
  }

  submit = () => {
    this.props.login(this.state);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputContainerStyle}
          label="Email"
          onChangeText={(email) => this.setState({email})}
        />

        <TextInput
          style={styles.inputContainerStyle}
          onChangeText={(password) => this.setState({password})}
          label="Password"
          secureTextEntry={true}
        />

        <Button mode="contained"
                onPress={this.submit}
                style={styles.button}>
          <Text style={styles.buttonContent}>Login</Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    margin: 8,
    width: "30%",
    paddingVertical: 4,
    borderRadius: 4,
  },
  buttonContent: {
    fontWeight: "600",
    fontSize: 22,
    color: "white",
  },
  inputContainerStyle: {
    margin: 8,
    width: '85%',
  },
});