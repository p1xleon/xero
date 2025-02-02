import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { ThemedView } from "../../components/ui/ThemedView";

import { Link, router } from "expo-router";
import Button from "../../components/ui/Button";

const Welcome = () => {
  return (
    <ThemedView style={styles.container}>
      <Image style={styles.image} source={require("../../assets/clash.png")} />
      <View style={styles.buttonContainer}>
        <View style={{ width: "100%" }}>
          <Button title="LOG IN" onPress={() => router.push('/logIn')} />
          <Button title="SIGN UP" onPress={() => router.push('/signUp')} />
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#000",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    alignItems: "center",
  },
});

export default Welcome;
