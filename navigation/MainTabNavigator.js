import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import CreateExpense from "../screens/CreateExpense";
import MonthlyScreen from "../screens/MonthlyScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import Colors from "../constants/Colors";
import ExpenseDetail from "../components/ExpenseDetail";
import SettingsScreen from "../screens/SettingsScreen";
import ExpensesByCategory from "../components/ExpensesByCategory";
import ProfileScreen from "../screens/ProfileScreen";

const MonthlyStack = createStackNavigator({
  Monthly: MonthlyScreen,
  ExpensesByMonth: ExpensesByCategory
});

MonthlyStack.navigationOptions = {
  tabBarLabel: "Summary",
  tabBarOptions: {
    activeTintColor: Colors.tintColor
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-paper" : "md-paper"}
    />
  )
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Expense: ExpenseDetail,
  CreateExpense: CreateExpense
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarOptions: {
    activeTintColor: Colors.tintColor
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-home` : "md-home"}
    />
  )
};

const CategoriesStack = createStackNavigator({
  Categories: CategoriesScreen
});

CategoriesStack.navigationOptions = {
  tabBarLabel: "Categories",
  tabBarOptions: {
    activeTintColor: Colors.tintColor
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-filing" : "md-filing"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Profile: ProfileScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarOptions: {
    activeTintColor: Colors.tintColor
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  MonthlyStack,
  CategoriesStack,
  SettingsStack
});
