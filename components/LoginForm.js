import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';

export default class LoginInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: '',
        password: '',
      },
    };
  }

  submit = () => {
    this.props.login(this.state);
  }

  render() {
    return (
      <View style={this.props.coolStyle}>
        <Text style={styles.bigText}>Login</Text>
        <TextInput
          style={{height: 40, width: 260, backgroundColor: "white"}}
          onChangeText={(email) => this.setState({email})}
          placeholder="Email"
        />

        <TextInput
          style={{height: 40, width: 100, backgroundColor: "white"}}
          onChangeText={(password) => this.setState({password})}
          placeholder="password"
          secureTextEntry={true}
        />

        <Button
          title="Login"
          onPress={this.submit}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigText: {
    fontWeight: 'bold'
  },
  bigButton: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
  });