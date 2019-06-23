import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Keyboard,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DatePicker from './DatePicker';
import { updateExpense, deleteExpense } from '../actions/expenseActions';
import Colors from '../constants/Colors';

class ExpenseDetail extends React.Component {
  constructor(props) {
    super(props);

    const expense = props.navigation.getParam("expense", null);

    this.state = {
      persisted: expense,
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      date: new Date(expense.date),
      category: expense.category_id,
      editing: false,
    };
  }

  static navigationOptions = {
    title: 'Expense Detail',
    headerTintColor: Colors.tintColor,
  };

  categories = this.props.categories.map((category) => {
    return (
      <Picker.Item label={category.name} value={category.id} key={category.id}/>
    )
  });

  resetStateToOrigin = () => {
    this.setState(state => {
      return {
        persisted: state.persisted,
        id: state.id,
        description: state.persisted.description,
        amount: state.persisted.amount,
        date: new Date(state.persisted.date),
        category: state.persisted.category_id,
        editing: false,
      };
    });
  }

  handleDescriptionChange = (text) => {
    this.setState({
      description: text,
      editing: true,
    })
  }

  handleAmountChange = (text) => {
    this.setState({
      amount: text,
      editing: true,
    });
  }

  handleCategoryChange = (newcategory) => {
    this.setState({
      category: newcategory,
      editing: true,
    });
  }

  handleDateChange = (date) => {
    this.setState({
      date,
      editing: true,
    });
  }

  handleCancel = () => {
    this.resetStateToOrigin();
    Keyboard.dismiss();
  }

  saveExpense = () => {
    this.props.updateExpense(this.state)
      .then((data) => {
        this.setState({editing: false});
        Keyboard.dismiss();
      });
  }

  handleDelete = () => {
    this.props.deleteExpense(this.state.id)
      .then(() => {
        this.props.navigation.navigate("Home");
      });
  }

  buttons = () => {
    if (this.state.editing) {
      return <View style={styles.buttonContainer}>
        <Button onPress={this.handleCancel} mode="contained" style={styles.button}>
          Cancel
        </Button>

        <Button onPress={this.saveExpense} mode="contained" style={styles.button}>
          Save
        </Button>
      </View>
    } else {
      return <View style={styles.buttonContainer}>
        <Button onPress={this.handleDelete} mode="contained" style={styles.button}>
          Delete
        </Button>
      </View>
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.inputFields}>
            <DatePicker
              style={styles.inputContainerStyle}
              date={this.state.date}
              onDateChange={this.handleDateChange}
              mode="outlined"
            />
            <TextInput
              style={styles.inputContainerStyle}
              label="Description"
              value={this.state.description}
              onChangeText={this.handleDescriptionChange}
              mode="outlined"
            />
            <TextInput
              style={styles.inputContainerStyle}
              label="Amount"
              keyboardType="numeric"
              value={this.state.amount}
              onChangeText={this.handleAmountChange}
              mode="outlined"
            />
          </View>

          <Picker selectedValue={this.state.category}
            style={styles.inputContainerStyle}
            onValueChange={this.handleCategoryChange}>
            {this.categories}
          </Picker>
        </ScrollView>

        {this.buttons()}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  inputFields: {
    padding: 16,
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
  buttonContainer: {
    height: "10%",
    marginVertical: 8,
    borderTopColor: Colors.accentColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
  }
});

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses.expenses,
    categories: state.categories.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateExpense,
    deleteExpense,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseDetail);