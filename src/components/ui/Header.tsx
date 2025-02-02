import { StatusBar, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useThemeColor } from "../../hooks/useThemeColor";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

interface HeaderProps {
  title?: string;
};

const Header = ({ title }: HeaderProps) => {
  const color = useThemeColor({ light: "#000", dark: "#fff" }, "background");

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontFamily: "Clash", color: color }]}>{title}</Text>
      <TouchableOpacity onPress={() => router.push('/settings')}>
        <Icon name="cog-outline" size={32} color={"#ececec"} style={{ marginRight: 10 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 5 : StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 32,
  },
});

export default Header;
