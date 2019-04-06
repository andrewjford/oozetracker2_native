import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';

export default class CategoryForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  submit = () => {
    this.props.createCategory(this.state);
  }

  handleNameChange = (value) => {
    this.setState({name: value});
  }

  render() {
    return (
      <View style={this.props.coolStyle}>
        <TextInput
          style={{height: 40, width: 100, backgroundColor: "white"}}
          onChangeText={this.handleNameChange}
          placeholder="Name"
        />

        <Button
          title="Create Category"
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