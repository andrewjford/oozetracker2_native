import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { List, Button, IconButton, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  createCategory,
  deleteCategory,
  updateCategory,
} from '../actions/categoriesActions';

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

  handleEdit = (category) => {
    this.setState({
      editing: category.id,
      input: category.name,
    });
  }

  handleUpdate = () => {
    console.log(this.state);
    this.props.updateCategory({
      id: this.state.editing,
      name: this.state.input,
    }).then(() => {
      this.setState({
        editing: null,
        input: null,
      });
    });
  }

  createCategory = (newCategory) => {
    this.props.createCategory(newCategory);
    this.setState({showCategoryForm: false});
  }

  renderLineItems = () => {
    if (!this.props.categories) {return <Text>Add some categories!</Text>};
    return this.props.categories.map((category) => {
      if (this.state.editing && this.state.editing === category.id) {
        return (
          <View key={category.id}>
              <TextInput
                value={this.state.input}
                onChangeText={input => this.setState({ input })}
                onBlur={() => this.handleUpdate()}
                autoFocus={true}/>
          </View>
        )
      } else {
        return (
          <List.Item
            title={category.name} 
            key={category.id}
            onPress={() => this.handleEdit(category)}
            right={() => <IconButton color="red" icon="close" onPress={() => this.props.deleteCategory({id: category.id})}/>}/>
        );
      }
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
    updateCategory,
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
