import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "../components/ui/ThemedView";
import { ThemedText } from "../components/ui/ThemedText";

const Changelog = () => {
  return (
    <ThemedView>
      <ThemedText type="defaultSemiBold">Version 1.0</ThemedText>
      <ThemedText type="secondarySemiBold">● Initial Build</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({});

export default Changelog;
