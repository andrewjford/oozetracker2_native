import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoginForm from "../components/LoginForm";
import { login, register } from "../actions/accountActions";
import { fetchRecentExpenses } from "../actions/expenseActions";
import { fetchCategories } from "../actions/categoriesActions";
import Colors from "../constants/Colors";
import ErrorDisplay from "../components/ErrorDisplay";
import ErrorHandling from "../services/ErrorHandling";
import SignupForm from "../components/SignupForm";
import { NavigationContainerProps } from "react-navigation";
import { AccountState, LoginActionCreator } from "../types/accountTypes";

interface DispatchProps {
  fetchRecentExpenses: Function;
  fetchCategories: Function;
  login: LoginActionCreator;
  register: Function;
}

interface StateProps {
  account: AccountState;
}

interface State {
  loading: boolean;
  errors: string[];
  signupOpen: boolean;
}

type Props = DispatchProps & NavigationContainerProps & StateProps;

class AuthScreen extends React.Component<Props, State> {
  state = {
    loading: null,
    errors: [],
    signupOpen: false
  };

  static navigationOptions = {
    header: null
  };

  login = account => {
    this.setState({ loading: true });
    this.props
      .login(account)
      .then(() => this.props.fetchRecentExpenses())
      .then(() => this.props.fetchCategories())
      .then(() => {
        this.setState({ loading: false });
        if (this.props.account.token) {
          this.props.navigation.navigate("Home");
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        this.setState({ errors: ErrorHandling.toErrorArray(error) });
      });
  };

  register = params => {
    this.setState({ loading: true });

    return this.props
      .register(params)
      .then(() => {
        this.setState({ loading: false });
        if (this.props.account.token) {
          this.props.navigation.navigate("Home");
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        this.setState({ errors: ErrorHandling.toErrorArray(error) });
      });
  };

  openSignup = () => {
    this.setState({ signupOpen: true });
  };

  closeSignup = () => {
    this.setState({ signupOpen: false });
  };

  clearErrors = () => {
    this.setState({ errors: [] });
  };

  render() {
    const form = () => {
      if (this.state.loading) {
        return <ActivityIndicator size="large" color={Colors.tintColor} />;
      } else if (this.state.signupOpen) {
        return (
          <SignupForm register={this.register} closeForm={this.closeSignup} />
        );
      } else {
        return <LoginForm login={this.login} openSignup={this.openSignup} />;
      }
    };

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.topSection}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode={"center"}
              style={styles.image}
              source={require("../assets/images/fullblob.png")}
            />
          </View>
          <ErrorDisplay
            errors={this.state.errors}
            clearErrors={this.clearErrors}
          />
        </View>
        <View style={styles.formSection}>{form()}</View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    account: state.account
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login,
      fetchRecentExpenses,
      fetchCategories,
      register
    },
    dispatch
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  imageContainer: {
    flex: 5,
    paddingHorizontal: 24
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    justifyContent: "flex-end"
  },
  topSection: {
    flex: 1
  },
  formSection: {
    flex: 1
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
