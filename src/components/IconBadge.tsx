import { StyleSheet, Image, View, StyleProp, ImageStyle, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "./ui/ThemedText";

type IconBadgeProps = {
  level: number | null;
  maxLevel: number | null;
  icon: string;
  style?: StyleProp<ImageStyle>;
  locked?: boolean;
  onPress?: () => void;
 };

const IconBadge = ({ level, maxLevel, icon, style, locked, onPress }: IconBadgeProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} >
      {locked ? (
        <Image source={{ uri: icon }} style={[styles.image, style, { borderColor: "#868686", opacity: 0.5, marginBottom: 0 }]} />
      ) : (
        <>
          <Image source={{ uri: icon }} style={[styles.image, style, { borderColor: level === maxLevel ? "gold" : "#888888" }]} />
          <ThemedText
            type="subtext"
            style={[
              styles.text,
              {
                backgroundColor: level === maxLevel ? "gold" : "#000",
                color: level === maxLevel ? "#000" : "#fff",
              },
            ]}>
            {level}
          </ThemedText>
        </>
      )}
    </TouchableOpacity>
  );
};

export default IconBadge;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 5,
  },
  text: {
    fontWeight: "900",
    backgroundColor: "black",
    paddingHorizontal: 3,
    borderRadius: 3,
    fontSize: 10,
    borderWidth: 1,
    minWidth: 20,
    textAlign: "center",
  },
  image: {
    borderWidth: 2,
    borderRadius: 25,
    width: 45,
    height: 45,
    resizeMode: "center",
    marginBottom: -12,
  },
});
