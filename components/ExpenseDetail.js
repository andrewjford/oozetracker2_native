import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  ScrollView,
  StyleSheet,
  Picker
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DatePicker from './DatePicker';

class ExpenseDetail extends React.Component {
  constructor(props) {
    super(props);

    const expense = props.navigation.getParam("expense", null);

    this.state = {
      description: expense.description,
      amount: expense.amount,
      date: new Date(expense.date),
      category: expense.category,
    };
  }

  categories = this.props.categories.map((category) => {
    return (
      <Picker.Item label={category.name} value={category.id} key={category.id}/>
    )
  });

  handleAmountChange = (text) => {
    this.setState({amount: text});
  }

  handleCategoryChange = (newcategory) => {
    this.setState({category: newcategory});
  }

  render() {
    return (
      <View style={[styles.container]}>
        <ScrollView>
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

        {/* <Button onPress={this.submit} mode="contained" style={styles.button}>
          Submit
        </Button> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
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
  },
});

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses.expenses,
    categories: state.categories.categories,
  }
}

export default connect(mapStateToProps)(ExpenseDetail);