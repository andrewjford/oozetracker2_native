import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function submit() {
    this.props.register({
      name,
      email,
      password,
    })
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputContainerStyle}
        label="Name"
        value={name}
        onChangeText={input => setName({ input })}
      />

      <TextInput
        style={styles.inputContainerStyle}
        label="Email"
        value={email}
        onChangeText={input => setEmail({ input })}
      />

      <TextInput
        style={styles.inputContainerStyle}
        label="Password"
        value={password}
        onChangeText={input => setPassword({ input })}
        secureTextEntry={true}
      />

      <Button mode="contained" onPress={submit} style={styles.button}>
        <Text style={styles.buttonContent}>Submit</Text>
      </Button>
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
    width: "30%",
    borderRadius: 4
  },
  buttonContent: {
    fontWeight: "600",
    fontSize: 22,
    color: "white"
  },
  buttonContentOutline: {
    fontWeight: "600",
    fontSize: 22,
    color: Colors.tintColor
  },
  inputContainerStyle: {
    margin: 8,
    width: "85%"
  }
});

export default SignupForm;
