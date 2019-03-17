import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';

const listExpenses = (props) => {
    const expenses = props.expenseData;
    
    if (expenses) {
      const groupedExpenses = expenses.reduce((accum, expense) => {
        if (accum[expense.category]) {
          accum[expense.category] += parseFloat(expense.amount);
        } else {
          accum[expense.category] = parseFloat(expense.amount);
        }
  
        return accum;
      }, {});

      const categorySummary = Object.entries(groupedExpenses)
        .map(([theKey, value]) => ({category: theKey, amount: value}));

      return (
        <FlatList data={categorySummary}
          keyExtractor={item => item.category}
          renderItem={
            ({item}) => {
              return (
                <View style={styles.container}>
                  <Text style={styles.itemLeft}>{item.category}</Text>
                  <Text style={styles.itemRight}>{item.amount}</Text>
                </View>
              )
            }
          }
        />
      )
    } else {
      return null;
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    width: "80%"
  },
  itemLeft: {
    width: "50%",
    textAlign: "left"
  },
  itemRight: {
    width: "50%",
    textAlign: "right"
  }
});

export default listExpenses;