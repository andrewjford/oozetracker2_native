import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default class CategoryForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  submit = () => {
    this.props.createCategory(this.state);
    this.state.name = '';
  }

  cancel = () => {
    this.props.cancel();
    this.state.name = '';
  }

  handleNameChange = (value) => {
    this.setState({name: value});
  }

  render() {
    return (
      <View style={this.props.coolStyle}>
        <TextInput
          style={styles.inputStyle}
          label="Name"
          value={this.state.name}
          onChangeText={this.handleNameChange}
        />

        <Button mode="contained" onPress={this.submit}>Submit</Button>
        <Button mode="contained" onPress={this.cancel}>Cancel</Button>
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
  },
  inputStyle: {
    width: '100%'
  }
  });