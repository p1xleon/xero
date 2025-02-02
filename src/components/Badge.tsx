import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "./ui/ThemedText";

type BadgeProps = {
  value: string | number;
  icon?: string;
  imageUrl?: string;
};

const Badge = ({ value, icon, imageUrl }: BadgeProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.icon}
      />
      <ThemedText type="defaultSemiBold">{value}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 7,
    marginEnd: 5,
    marginVertical: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#4d4d4d'
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default Badge;
