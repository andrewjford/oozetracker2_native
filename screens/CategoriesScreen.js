import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { List, Button, IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createCategory, deleteCategory } from '../actions/categoriesActions';

import CategoryForm from '../components/CategoryForm';

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
        <List.Item title={category.name} key={category.id}
          right={() => <IconButton color="red" icon="close" onPress={() => this.props.deleteCategory({id: category.id})}/>}/>
      );
    });
  }

  renderAddCategories = () => {
    if (this.state.showCategoryForm) {
      return <CategoryForm createCategory={this.createCategory}/>;
    } else {
      return <Button style={styles.button} mode="contained" onPress={this.handleAddPress}>Add a Category</Button>
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
    deleteCategory,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "center",
    width: "100%",
  },
  button: {
    width: "60%",
    alignSelf: "center",
  },
});
