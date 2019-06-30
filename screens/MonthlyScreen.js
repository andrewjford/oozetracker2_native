import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { DataTable, IconButton } from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import currency from "currency.js";

import {
  getMonthly,
  changeMonthlyView,
  getAllMonth
} from "../actions/expenseActions";
import Colors from "../constants/Colors";

class MonthlyScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      rotate: false,
      isRefreshing: false,
      isLoading: false
    };
  }

  static navigationOptions = {
    title: "Monthly Summary"
  };

  componentDidMount() {
    const currentMonthRequest = {
      month: this.state.date.getMonth(),
      year: this.state.date.getFullYear()
    };
    this.loadMonthly(currentMonthRequest);
  }

  onCategorySelect = rowData => {
    const monthString = `${this.state.date.getFullYear()}-${this.state.date.getMonth()}`;
    this.getExpensesForMonth(monthString).then(() => {
      const filteredExpenses = this.props.byMonth[monthString].filter(
        expense => {
          return expense.category_id === rowData.id;
        }
      );
      this.props.navigation.navigate("ExpensesByMonth", {
        expenses: filteredExpenses
      });
    });
  };

  getExpensesForMonth = monthString => {
    return this.props.getAllMonth(monthString, this.state.date);
  };

  renderRows = () => {
    if (!this.props.monthlyView) {
      return <Text />;
    }
    return this.props.monthlyView.rows.map(lineItem => {
      return (
        <DataTable.Row
          key={lineItem.id}
          onPress={() => this.onCategorySelect(lineItem)}
        >
          <DataTable.Cell>{lineItem.name}</DataTable.Cell>
          <DataTable.Cell numeric>
            {currency(lineItem.sum).format()}
          </DataTable.Cell>
        </DataTable.Row>
      );
    });
  };

  _onRefresh = () => {
    this.setState({ isRefreshing: true });
    const currentMonthRequest = {
      month: this.state.date.getMonth(),
      year: this.state.date.getFullYear()
    };
    this.props.getMonthly(currentMonthRequest).then(() => {
      this.setState({ isRefreshing: false });
    });
  };

  loadMonthly = monthlyObject => {
    this.setState({ isLoading: true });
    const cachedView = this.props.monthlies.find(monthly => {
      return (
        monthly.month === monthlyObject.month &&
        monthly.year === monthlyObject.year
      );
    });

    if (cachedView) {
      this.props.changeMonthlyView(cachedView);
      this.setState({ isLoading: false });
    } else {
      this.props.getMonthly(monthlyObject).then(() => {
        this.setState({ isLoading: false });
      });
    }
  };

  handleLeftMonthClick = () => {
    const date = this.state.date;
    date.setMonth(this.state.date.getMonth() - 1);
    this.setState({ date });

    const currentMonthRequest = {
      month: date.getMonth(),
      year: date.getFullYear()
    };
    this.loadMonthly(currentMonthRequest);
  };

  handleRightMonthClick = () => {
    const date = this.state.date;
    date.setMonth(this.state.date.getMonth() + 1);
    this.setState({ date });

    const currentMonthRequest = {
      month: date.getMonth(),
      year: date.getFullYear()
    };
    this.loadMonthly(currentMonthRequest);
  };

  renderDataTable = () => {
    total = !this.props.monthlyView
      ? currency(0)
      : this.props.monthlyView.rows.reduce((accum, lineItem) => {
          return accum.add(lineItem.sum);
        }, currency(0));

    if (this.state.isLoading) {
      return (
        <ActivityIndicator
          size="large"
          color={Colors.tintColor}
          style={styles.container}
        />
      );
    } else {
      return (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Category</DataTable.Title>
              <DataTable.Title numeric>Amount</DataTable.Title>
            </DataTable.Header>

            {this.renderRows()}

            <DataTable.Row>
              <DataTable.Cell>
                <Text style={styles.bold}>Total</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={styles.bold}>{total.format()}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </ScrollView>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          {this.state.date.getFullYear()}{" "}
          {this.state.monthNames[this.state.date.getMonth()]}
        </Text>

        {this.renderDataTable()}

        <View style={styles.buttonContainer}>
          <IconButton
            color={Colors.tintColor}
            icon="arrow-back"
            onPress={this.handleLeftMonthClick}
          />
          <Text style={styles.headerText}>
            {this.state.date.getFullYear()}{" "}
            {this.state.monthNames[this.state.date.getMonth()]}
          </Text>
          <IconButton
            color={Colors.tintColor}
            icon="arrow-forward"
            onPress={this.handleRightMonthClick}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    monthlyView: state.expenses.monthlies.currentView,
    monthlies: state.expenses.monthlies.monthlies,
    byMonth: state.expenses.byMonth
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getMonthly,
      changeMonthlyView,
      getAllMonth
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthlyScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 5,
    fontWeight: "bold"
  },
  bold: {
    fontWeight: "bold"
  },
  buttonContainer: {
    flexDirection: "row",
    height: "10%",
    marginVertical: 8,
    borderTopColor: Colors.accentColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    alignItems: "center"
  }
});
