import { Linking, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "../../components/ui/ThemedView";
import WarWidget from "../../components/WarWidget";
import Header from "../../components/ui/Header";
import SearchBar from "../../components/ui/SearchBar";
import ProfileList from "../../components/ProfileList";

const WarStatus = () => {
  return (
    <ThemedView>
      <Header title="wars" />
      <SearchBar type="clan" />
      <WarWidget />
      <ProfileList />
    </ThemedView>
  );
};

const styles = StyleSheet.create({});

export default WarStatus;
