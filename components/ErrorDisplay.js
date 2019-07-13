import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Surface, IconButton } from "react-native-paper";

const ErrorDisplay = props => {
  const errorSection = () => {
    if (props.errors && props.errors.length > 0) {
      return (
        <View style={styles.container}>
          <Surface style={styles.surface}>
            <View style={styles.message}>
              <IconButton icon="error" color="white" style={styles.icon} />
              <Text style={styles.text}>Error: {props.errors.toString()}</Text>
            </View>
            <IconButton
              style={styles.closeButton}
              color="white"
              icon="close"
              onPress={props.clearErrors}
            />
          </Surface>
        </View>
      );
    } else {
      return null;
    }
  };

  return errorSection();
};

export default ErrorDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
    elevation: 4,
    backgroundColor: "red"
  },
  surface: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "red",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 18
  },
  message: {
    flexDirection: "row",
    flex: 5,
    alignItems: "center"
  },
  closeButton: {
    flexDirection: "row",
    flex: 1,
    alignSelf: "center",
    justifyContent: "flex-end"
  }
});
