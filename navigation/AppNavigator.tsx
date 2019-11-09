import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import AuthScreen from "../screens/AuthScreen";

export default createAppContainer(
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      AuthLoading: AuthLoadingScreen,
      Auth: AuthScreen
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
