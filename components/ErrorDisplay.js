import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Surface, Text } from 'react-native-paper';

const ErrorDisplay = props => {
  const errorSection = () => {
    if (props.errors.showError) {
      return (
        <View style={styles.container}>
          <Surface style={styles.surface}>
            <Text>Error: {props.errors.errors.toString()}</Text>
          </Surface>
        </View>
      );
    } else {
      return null;
    }
  }
  
  return errorSection();
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
  }
}

export default connect(mapStateToProps)(ErrorDisplay);

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
    backgroundColor: 'red'
  }
});
