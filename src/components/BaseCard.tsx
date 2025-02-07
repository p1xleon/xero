import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { ReactNode } from "react";
import { Link } from "expo-router";
import { TownHallMap } from "../constants/HallMaps";
import { ThemedText } from "./ui/ThemedText";

interface BaseCardProps {
  name: string;
  thLevel: number;
  clanBadge: string | undefined;
  clanName: string | undefined;
  tag: string;
  lastOnline?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const BaseCard = ({ name, thLevel, tag, children, style, lastOnline, clanBadge, clanName }: BaseCardProps) => {
  return (
    <View style={[styles.profile, style]}>
      <Link
        href={{
          pathname: "/player/[playerId]",
          params: { playerId: tag },
        }}>
        <View style={styles.strip}>
          <Image source={{ uri: TownHallMap[thLevel] }} style={styles.thImage} />
          <View>
            <ThemedText type="subtitle" style={{ color: "#333333" }}>
              {name}
            </ThemedText>
            <ThemedText type="subtextBold" style={{ color: "#4b4b4b" }}>
              {tag}
            </ThemedText>
            <View style={styles.strip}>
              <Image source={{ uri: clanBadge }} style={styles.clanbadge} />
              <ThemedText type="subtextBold" style={{ color: "#525252" }}>
                {clanName}
              </ThemedText>
            </View>
          </View>
        </View>
      </Link>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "space-between",
  },
  strip: {
    flexDirection: "row",
    alignItems: "center",
  },
  clanbadge: {
    width: 20,
    height: 20,
    marginRight: 2,
    marginBottom: 2,
  },
  thImage: {
    width: 70,
    height: 70,
    marginRight: 10,
    resizeMode: "center",
  },
});
export default BaseCard;
