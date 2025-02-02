import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { ThemedBlockView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { LinkProps } from "expo-router";

type SettingsCardProps = {
  title: string;
  children?: ReactNode;
};

type SettingsLinkProps = {
  name: string;
  icon?: string;
  // href: LinkProps['href'];
};
export const SettingsLink = ({ name, icon }: SettingsLinkProps) => {
  <ThemedBlockView>
    <ThemedText>{name}</ThemedText>
  </ThemedBlockView>;
};

const SettingsCard = ({ title, children }: SettingsCardProps) => {
  return (
    <ThemedBlockView style={{marginVertical: 10}}>
      <ThemedText type="defaultSemiBold">{title}</ThemedText>
      <ThemedBlockView style={styles.card}>{children}</ThemedBlockView>
    </ThemedBlockView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  },
});

export default SettingsCard;
