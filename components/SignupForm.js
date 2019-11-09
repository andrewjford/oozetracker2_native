import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import Colors from "../constants/Colors";

const SignupForm = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function submit() {
    props.register({
      name,
      email,
      password,
    });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputContainerStyle}
        label="Name"
        value={name}
        onChangeText={input => setName(input)}
      />

      <TextInput
        style={styles.inputContainerStyle}
        label="Email"
        value={email}
        onChangeText={input => setEmail(input)}
      />

      <TextInput
        style={styles.inputContainerStyle}
        label="Password"
        value={password}
        onChangeText={input => setPassword(input)}
        secureTextEntry={true}
      />

      <View style={styles.buttonContainer}>
        <View style={styles.horizontalButtons}>
          <Button mode="outlined" onPress={props.closeForm} style={styles.button}>
            <Text style={styles.buttonContentOutline}>Back</Text>
          </Button>
          <Button mode="contained" onPress={submit} style={styles.button}>
            <Text style={styles.buttonContent}>Submit</Text>
          </Button>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  button: {
    margin: 8,
    width: "40%",
    borderRadius: 4,
    alignSelf: "center",
  },
  buttonContent: {
    fontWeight: "600",
    fontSize: 18,
    color: "white"
  },
  buttonContentOutline: {
    fontWeight: "600",
    fontSize: 18,
    color: Colors.tintColor
  },
  inputContainerStyle: {
    margin: 8,
    width: "85%"
  },
  buttonContainer: {
    marginVertical: 8,
    justifyContent: "center"
  },
  horizontalButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});

export default SignupForm;
