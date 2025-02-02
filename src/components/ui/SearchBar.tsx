import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useThemeColor } from "../../hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

interface SearchBarProps {
  type: "player" | "clan";
}

const SearchBar = ({ type }: SearchBarProps) => {
  const background = useThemeColor({ light: "#dfdfdf", dark: "#222222" }, "background");
  return (
    <View>
      <Link href={type === "player" ? '/playerSearch' : '/clanSearch'} style={[styles.searchContainer, { backgroundColor: background }]}>
        <ThemedText style={styles.searchText}>Search for players and clans</ThemedText>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    borderRadius: 50,
    padding: 12,
    elevation: 1,
    marginBottom: 10,
  },
  searchText: {
    fontWeight: "600",
    color: "#7c7c7c",
  },
});

export default SearchBar;
