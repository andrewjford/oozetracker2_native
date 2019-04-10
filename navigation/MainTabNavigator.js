import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NewExpense from '../screens/NewExpense';
import MonthlyScreen from '../screens/MonthlyScreen';
import CategoriesScreen from '../screens/CategoriesScreen';

const MonthlyStack = createStackNavigator({
  Monthly: MonthlyScreen,
});

MonthlyStack.navigationOptions = {
  tabBarLabel: 'Summary',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-paper' : 'md-paper'}
    />
  ),
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-home` : 'md-home'}
    />
  ),
};

const NewExpenseStack = createStackNavigator({
  NewExpense: NewExpense,
});

NewExpenseStack.navigationOptions = {
  tabBarLabel: 'New Expense',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-card' : 'md-card'}
    />
  )
};

const CategoriesStack = createStackNavigator({
  Categories: CategoriesScreen,
})

CategoriesStack.navigationOptions = {
  tabBarLabel: 'Categories',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-filing' : 'md-filing'}
    />
  )
}

export default createBottomTabNavigator({
  HomeStack,
  MonthlyStack,
  NewExpenseStack,
  CategoriesStack,
});
