import React from "react";
import { View, ScrollView, StyleSheet, Picker } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DatePicker from "./DatePicker";
import Colors from "../constants/Colors";

export default class ExpenseInput extends React.Component {
  constructor(props) {
    super(props);
    let theDate = new Date();
    this.state = {
      description: "",
      amount: 0,
      date: theDate,
      category: this.props.categories[0].id
    };
  }

  categories = this.props.categories.map(category => {
    return (
      <Picker.Item
        label={category.name}
        value={category.id}
        key={category.id}
      />
    );
  });

  submit = () => {
    this.props.createExpense(this.state);
  };

  handleAmountChange = text => {
    this.setState({ amount: text });
  };

  handleCategoryChange = newcategory => {
    this.setState({ category: newcategory });
  };

  render() {
    return (
      <View style={[styles.container]}>
        <ScrollView>
          <View style={styles.inputFields}>
            <DatePicker
              style={styles.inputContainerStyle}
              date={this.state.date}
              onDateChange={date => {
                this.setState({ date: date });
              }}
            />
            <TextInput
              style={styles.inputContainerStyle}
              label="Description"
              value={this.state.description}
              selectTextOnFocus={true}
              onChangeText={description => this.setState({ description })}
            />

            <TextInput
              style={styles.inputContainerStyle}
              label="Amount"
              keyboardType="numeric"
              value={String(this.state.amount)}
              selectTextOnFocus={true}
              onChangeText={this.handleAmountChange}
            />

            <Picker
              selectedValue={this.state.category}
              style={styles.inputContainerStyle}
              onValueChange={this.handleCategoryChange}
            >
              {this.categories}
            </Picker>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button onPress={this.submit} mode="contained" style={styles.button}>
            Submit
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  inputFields: {
    padding: 16
  },
  wrapper: {
    flex: 1
  },
  inputContainerStyle: {
    margin: 8
  },
  button: {
    width: "40%",
    alignSelf: "center"
  },
  buttonContainer: {
    height: "10%",
    marginVertical: 8,
    borderTopColor: Colors.accentColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: "center"
  }
});
