import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Picker
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import currency from "currency.js";

import DatePicker from "../components/DatePicker";
import { createExpense } from "../actions/expenseActions";
import Colors from "../constants/Colors";
import ErrorDisplay from "../components/ErrorDisplay";
import ErrorHandling from "../services/ErrorHandling";

class NewExpense extends React.Component {
  constructor(props) {
    super(props);
    const theDate = new Date();

    this.state = {
      isLoading: false,
      errors: [],
      description: "",
      amount: currency(0).format(),
      date: theDate,
      category: this.props.categories[0].id
    };
  }

  static navigationOptions = {
    title: "New Expense",
    headerTintColor: Colors.tintColor
  };

  setStateAsync = newState => {
    return new Promise(resolve => this.setState(newState, resolve));
  };

  addExpense = newExpense => {
    return this.setStateAsync({ isLoading: true })
      .then(() => {
        return this.props.createExpense(newExpense);
      })
      .then(() => {
        this.props.navigation.navigate("Home");
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          errors: ErrorHandling.toErrorArray(error)
        });
      });
  };

  clearErrors = () => {
    this.setState({ errors: [] });
  };

  categories = this.props.categories.map(category => {
    return (
      <Picker.Item
        label={category.name}
        value={category.id}
        key={category.id}
      />
    );
  });

  handleAmountChange = text => {
    this.setState({ amount: text });
  };

  handleCategoryChange = newcategory => {
    this.setState({ category: newcategory });
  };

  handleSubmit = () => {
    this.addExpense({
      description: this.state.description,
      amount: this.state.amount,
      date: this.state.date,
      category: this.state.category
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator
          size="large"
          color={Colors.tintColor}
          style={styles.container}
        />
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <ErrorDisplay
            errors={this.state.errors}
            clearErrors={this.clearErrors}
          />
          <View style={styles.inputFields}>
            <DatePicker
              style={styles.inputContainerStyle}
              date={this.state.date}
              onDateChange={date => this.setState({ date })}
            />
            <TextInput
              style={styles.inputContainerStyle}
              label="Description"
              value={this.state.description}
              selectTextOnFocus={true}
              onChangeText={description => this.setState({ description })}
              underlineColor={Colors.accentColor}
              selectionColor={Colors.secondaryColor}
            />

            <TextInput
              style={styles.inputContainerStyle}
              label="Amount"
              keyboardType="numeric"
              value={String(this.state.amount)}
              selectTextOnFocus={true}
              onChangeText={this.handleAmountChange}
              underlineColor={Colors.accentColor}
              selectionColor={Colors.secondaryColor}
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
          <Button
            onPress={this.handleSubmit}
            mode="contained"
            style={styles.button}
          >
            Submit
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    expenses: state.expenses.expenses,
    categories: state.categories.categories
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createExpense
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewExpense);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  inputFields: {
    padding: 16
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
