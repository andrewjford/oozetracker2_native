import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Picker
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DatePicker from './DatePicker';

export default class ExpenseInput extends React.Component {

  constructor(props) {
    super(props);
    let theDate = new Date();
    this.state = {
      description: '',
      amount: '0',
      date: theDate,
      category: this.props.categories[0].id
    };

    this.submit = this.submit.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  categories = this.props.categories.map((category) => {
    return (
      <Picker.Item label={category.name} value={category.id} key={category.id}/>
    )
  });

  submit() {
    this.props.createExpense(this.state)
      .then(() => {
        this.resetState();
      });
  }

  handleAmountChange(text) {
    this.setState({amount: text});
  }

  handleCategoryChange = (newcategory) => {
    this.setState({category: newcategory});
  }

  resetState = () => {
    let theDate = new Date();
    this.setState({
      description: '',
      amount: '0',
      date: theDate,
      category: this.props.categories[0].id
    })
  }

  render() {
    return (
      <View>
        <ScrollView style={[styles.container]}>
          <DatePicker
            style={styles.inputContainerStyle}
            date={this.state.date}
            onDateChange={(date) => {this.setState({date: date})}}
          />
          <TextInput
            style={styles.inputContainerStyle}
            label="Description"
            value={this.state.description}
            onChangeText={(description) => this.setState({description})}
          />

          <TextInput
            style={styles.inputContainerStyle}
            label="Amount"
            keyboardType="numeric"
            value={this.state.amount}
            onChangeText={this.handleAmountChange}
          />

          <Picker selectedValue={this.state.category}
            style={styles.inputContainerStyle}
            onValueChange={this.handleCategoryChange}>
            {this.categories}
          </Picker>

        </ScrollView>
        <Button onPress={this.submit} mode="contained" style={styles.button}>
          Submit
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  wrapper: {
    flex: 1,
  },
  inputContainerStyle: {
    margin: 8,
  },
  button: {
    width: "40%",
    alignSelf: "center",
  }
});