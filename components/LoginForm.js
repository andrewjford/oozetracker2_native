import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default class LoginInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

        <Button mode="contained" onPress={this.submit}
                style={styles.button}>Login</Button>
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
    width: '40%',
  },
  inputContainerStyle: {
    margin: 8,
    width: '85%',
  },
});