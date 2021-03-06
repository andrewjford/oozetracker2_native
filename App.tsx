import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./navigation/AppNavigator";
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
  Store
} from "redux";
import { Provider as StoreProvider } from "react-redux";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor } from "redux-persist/es/types";

import accountReducer from "./reducers/accountReducer";
import expenseReducer from "./reducers/expenseReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import Colors from "./constants/Colors";

interface Props {
  skipLoadingScreen: boolean;
}

interface State {
  isLoadingComplete: boolean;
}

const rootReducer = combineReducers({
  account: accountReducer,
  expenses: expenseReducer,
  categories: categoriesReducer
});

export type AppState = ReturnType<typeof rootReducer>;

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.tintColor,
    accent: Colors.accentColor
  }
};

const persistConfig = {
  key: "cashTrackerPersist",
  storage: AsyncStorage
};

export default class App extends React.Component<Props, State> {
  persistor: Persistor;
  store: Store;

  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    this.store = createStore(
      persistedReducer,
      composeEnhancers(applyMiddleware(thunk))
    );
    this.persistor = persistStore(this.store);
  }

  renderLoading = () => {
    return <AppLoading />;
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <StoreProvider store={this.store}>
          <PersistGate
            persistor={this.persistor}
            loading={this.renderLoading()}
          >
            <PaperProvider theme={theme}>
              <View style={styles.container}>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <AppNavigator persistor={this.persistor} />
              </View>
            </PaperProvider>
          </PersistGate>
        </StoreProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
