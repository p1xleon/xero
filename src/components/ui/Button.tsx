import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";

type ButtonProps = {
  title: string;
  onPress?: () => void;
};

const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e9e9e9",
    width: "100%",
    padding: 12,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  text: {
    color: "#1f1f1f",
    fontWeight: "900",
    fontSize: 20,
    fontFamily: "Clash",
  },
});

export default Button;
