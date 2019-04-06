import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const TableRow = (props) => {
  return (
    <View style={styles.tableRow}>
      <View style={styles.tableCell}><Text>{props.lineItem.name}</Text></View>
    </View>
  );
}

class CategoriesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderLineItems = () => {
    if (!this.props.categories) {return <Text>Add some categories!</Text>};
    return this.props.categories.map((category) => {
      return (
        <TableRow lineItem={category} key={category.id}/>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Categories</Text>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.tableContainer}>
            {this.renderLineItems()}
          </View>
        </ScrollView>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
  }
}

export default connect(mapStateToProps)(CategoriesScreen);

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
