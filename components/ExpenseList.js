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
        if (accum[expense.name]) {
          accum[expense.name] += parseFloat(expense.amount);
        } else {
          accum[expense.name] = parseFloat(expense.amount);
        }
  
        return accum;
      }, {});

      const nameSummary = Object.entries(groupedExpenses)
        .map(([theKey, value]) => ({name: theKey, amount: value}));

      return (
        <FlatList data={nameSummary}
          keyExtractor={item => item.name}
          renderItem={
            ({item}) => {
              return (
                <View style={styles.container}>
                  <Text style={styles.itemLeft}>{item.name}</Text>
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