import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createCategory } from '../actions/categoriesActions';

import CategoryForm from '../components/CategoryForm';

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
        <List.Item title={category.name} key={category.id}/>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Categories</Text>
        <List.Section>
          {this.renderLineItems()}
        </List.Section>

        <CategoryForm createCategory={this.props.createCategory}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createCategory,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);

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
