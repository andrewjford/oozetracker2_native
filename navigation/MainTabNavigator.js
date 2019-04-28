import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NewExpense from '../screens/NewExpense';
import MonthlyScreen from '../screens/MonthlyScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import Colors from '../constants/Colors';
import ExpenseDetail from '../components/ExpenseDetail';
import SettingsScreen from '../screens/SettingsScreen';

const MonthlyStack = createStackNavigator({
  Monthly: MonthlyScreen,
});

MonthlyStack.navigationOptions = {
  tabBarLabel: 'Summary',
  tabBarOptions: { 
    activeTintColor: Colors.tintColor,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-paper' : 'md-paper'}
    />
  ),
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Expense: ExpenseDetail,
  NewExpense: NewExpense,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: { 
    activeTintColor: Colors.tintColor,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-home` : 'md-home'}
    />
  ),
};

const CategoriesStack = createStackNavigator({
  Categories: CategoriesScreen,
})

CategoriesStack.navigationOptions = {
  tabBarLabel: 'Categories',
  tabBarOptions: { 
    activeTintColor: Colors.tintColor,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-filing' : 'md-filing'}
    />
  )
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarOptions: { 
    activeTintColor: Colors.tintColor,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
    />
  )
}

export default createBottomTabNavigator({
  HomeStack,
  MonthlyStack,
  CategoriesStack,
  SettingsStack,
});
