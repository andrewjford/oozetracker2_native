import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Surface, Text, IconButton } from 'react-native-paper';

const ErrorDisplay = props => {
  const errorSection = () => {
    if (props.errors && props.errors.length > 0) {
      return (
        <View style={styles.container}>
          <Surface style={styles.surface}>
            <IconButton icon="error" color="white" style={styles.icon}/>
            <Text style={styles.text}>Error: {props.errors.toString()}</Text>
          </Surface>
        </View>
      );
    } else {
      return null;
    }
  }
  
  return errorSection();
}

export default ErrorDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    height: 38,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 4,
    backgroundColor: 'red',
  },
  surface: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});
