import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { DataTable } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import currency from 'currency.js';

import { getMonthly } from '../actions/expenseActions';

class MonthlyScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      rotate: false,
    };
  }

  static navigationOptions = {
    title: 'Monthly Summary',
  };

  componentDidMount() {
    const currentMonthRequest = {
      month: this.state.date.getMonth(),
      year: this.state.date.getFullYear()
    };
    this.props.getMonthly(currentMonthRequest);
  }

  renderRows = () => {
    if (!this.props.monthlyView) {return <Text></Text>};
    return this.props.monthlyView.rows.map(lineItem => {
      return (
        <DataTable.Row key={lineItem.id}>
          <DataTable.Cell>{lineItem.name}</DataTable.Cell>
          <DataTable.Cell numeric>{lineItem.sum.format()}</DataTable.Cell>
        </DataTable.Row>
      );
    })
  }

  render() {
    const total = !this.props.monthlyView ? currency(0) : this.props.monthlyView.rows.reduce((accum, lineItem) => {
      return accum.add(lineItem.sum);
    },currency(0));
    
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          {this.state.date.getFullYear()} {this.state.monthNames[this.state.date.getMonth()]}
        </Text>

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
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    monthlyView: state.expenses.monthlies.currentView,
    monthlies: state.expenses.monthlies.monthlies,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getMonthly,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});
