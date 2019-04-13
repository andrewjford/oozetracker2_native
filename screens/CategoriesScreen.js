import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { List, Button } from 'react-native-paper';
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

  static navigationOptions = {
    title: 'Categories',
  };

  handleAddPress = () => {
    this.setState({showCategoryForm: true});
  }

  createCategory = (newCategory) => {
    this.props.createCategory(newCategory);
    this.setState({showCategoryForm: false});
  }

  renderLineItems = () => {
    if (!this.props.categories) {return <Text>Add some categories!</Text>};
    return this.props.categories.map((category) => {
      return (
        <List.Item title={category.name} key={category.id}/>
      );
    });
  }

  renderAddCategories = () => {
    if (this.state.showCategoryForm) {
      return <CategoryForm createCategory={this.createCategory}/>;
    } else {
      return <Button mode="contained" onPress={this.handleAddPress}>Add a Category</Button>
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <List.Section>
          {this.renderLineItems()}
        </List.Section>

        {this.renderAddCategories()}
      </ScrollView>
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
