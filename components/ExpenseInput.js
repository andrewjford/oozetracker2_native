import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Button,
  Picker
} from 'react-native';
import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-datepicker'

export default class ExpenseInput extends React.Component {

  constructor(props) {
    super(props);
    let theDate = new Date();
    theDate = `${theDate.getFullYear()}-${theDate.getMonth()+1}-${theDate.getDate()}`
    this.state = {
      description: '',
      amount: 0,
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
    this.props.createExpense(this.state);
  }

  handleAmountChange(text) {
    this.setState({amount: text});
  }

  handleCategoryChange = (newcategory) => {
    this.setState({category: newcategory});
  }

  render() {
    return (
      <View style={this.props.coolStyle}>
        <DatePicker
          style={{width: '100%'}}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        <TextInput
          label="Description"
          value={this.state.description}
          onChangeText={(description) => this.setState({description})}
        />

        <TextInput
          style={{height: 40, width: 100, backgroundColor: "white"}}
          keyboardType="numeric"
          onChangeText={this.handleAmountChange}
          placeholder="Amount"
        />

        <Picker selectedValue={this.state.category}
          style={{height: 40, width: '100%'}}
          onValueChange={this.handleCategoryChange}>
          {this.categories}
        </Picker>

        <Button
          title="Submit"
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