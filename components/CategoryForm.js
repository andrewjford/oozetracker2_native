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

  componentDidMount(){
    this.nameInput.focus();
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
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          label="Name"
          value={this.state.name}
          onChangeText={this.handleNameChange}
          ref={(input) => { this.nameInput = input; }} 
        />

        <Button mode="contained" onPress={this.submit} style={styles.button}>Submit</Button>
        <Button mode="outlined" onPress={this.cancel} style={styles.button}>Cancel</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
    width: "100%",
  },
  inputStyle: {
    width: '100%'
  }
  });