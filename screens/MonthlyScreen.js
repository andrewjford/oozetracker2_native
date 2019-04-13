import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getMonthly } from '../actions/expenseActions';

const TableRow = (props) => {
  return (
    <View style={styles.tableRow}>
      <View style={styles.tableCell}><Text>{props.lineItem.name}</Text></View>
      <View style={styles.tableCell}>
        <Text style={styles.textRight}>{props.lineItem.sum}</Text>
      </View>
    </View>
  );
}

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

  renderLineItems = () => {
    if (!this.props.monthlyView) {return <Text>No Recorded Expenses</Text>};
    return this.props.monthlyView.rows.map((lineItem) => {
      return (
        <TableRow lineItem={lineItem} key={lineItem.id}/>
      );
    });
  }

  render() {
    const total = !this.props.monthlyView ? 0 : this.props.monthlyView.rows.reduce((accum, lineItem) => {
      return accum + parseFloat(lineItem.sum);
    },0);
    
    return (
      <View style={styles.container}>
      <Text style={styles.headerText}>
        {this.state.date.getFullYear()} {this.state.monthNames[this.state.date.getMonth()]}
      </Text>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.tableContainer}>
            {this.renderLineItems()}
            <TableRow lineItem={{name: "Total", sum: total}} />
          </View>
        </ScrollView>

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
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: '75%',
  },
  contentContainer: {
    paddingTop: 30,
  },
  tableContainer: {
    flex: 1,
    marginBottom: 20,
  },
  tableRow: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    alignSelf: 'stretch',
  },
  textRight: {
    textAlign: 'right',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
  },
});
