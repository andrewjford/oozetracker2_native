import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView
} from "react-native";
import { List, Button, IconButton, TextInput } from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  createCategory,
  deleteCategory,
  updateCategory
} from "../actions/categoriesActions";
import CategoryForm from "../components/CategoryForm";
import Colors from "../constants/Colors";
import { Category } from "../types/categoryTypes";
import { StandardThunkResult } from "../types/accountTypes";

interface DispatchProps {
  categories: Category[];
  updateCategory: (Category) => any;
  createCategory: (Category) => StandardThunkResult<any>;
  deleteCategory: (string) => StandardThunkResult<any>;
}

interface State {
  input: string;
  editing?: string;
  showCategoryForm?: boolean;
}

class CategoriesScreen extends React.Component<DispatchProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  static navigationOptions = {
    title: "Categories",
    headerTintColor: Colors.tintColor
  };

  handleAddPress = () => {
    this.setState({ showCategoryForm: true });
  };

  handleEdit = category => {
    this.setState({
      editing: category.id,
      input: category.name
    });
  };

  handleUpdate = () => {
    this.props
      .updateCategory({
        id: this.state.editing,
        name: this.state.input
      })
      .then(() => {
        this.setState({
          editing: null,
          input: null
        });
      });
  };

  cancelForm = () => {
    this.setState({ showCategoryForm: false });
  };

  createCategory = newCategory => {
    this.props.createCategory(newCategory);
    this.setState({ showCategoryForm: false });
  };

  renderLineItems = () => {
    if (!this.props.categories) {
      return <Text>Add some categories!</Text>;
    }
    return this.props.categories.map(category => {
      if (this.state.editing && this.state.editing === category.id) {
        return (
          <View key={category.id}>
            <TextInput
              value={this.state.input}
              onChangeText={input => this.setState({ input })}
              onBlur={() => this.handleUpdate()}
              autoFocus={true}
            />
          </View>
        );
      } else {
        return (
          <List.Item
            title={category.name}
            key={category.id}
            onPress={() => this.handleEdit(category)}
            right={() => (
              <IconButton
                color={Colors.secondaryColor}
                icon="close"
                onPress={() => this.props.deleteCategory({ id: category.id })}
              />
            )}
          />
        );
      }
    });
  };

  renderAddCategories = () => {
    if (this.state.showCategoryForm) {
      return (
        <CategoryForm
          createCategory={this.createCategory}
          cancel={this.cancelForm}
        />
      );
    } else {
      return (
        <Button
          style={styles.button}
          mode="contained"
          onPress={this.handleAddPress}
        >
          Add Category
        </Button>
      );
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView style={styles.scrollContainer}>
          <List.Section>{this.renderLineItems()}</List.Section>
        </ScrollView>
        <View
          style={
            this.state.showCategoryForm ? styles.expandedAdd : styles.addSection
          }
        >
          {this.renderAddCategories()}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories.categories
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createCategory,
      deleteCategory,
      updateCategory
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "center",
    width: "100%"
  },
  button: {
    width: "60%",
    alignSelf: "center"
  },
  addSection: {
    height: "10%",
    marginVertical: 8,
    borderTopColor: Colors.accentColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: "center"
  },
  scrollContainer: {
    height: "85%"
  },
  expandedAdd: {
    height: "45%",
    borderTopColor: Colors.accentColor,
    borderTopWidth: StyleSheet.hairlineWidth
  }
});
