import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedBlockView } from "./ui/ThemedView";
import { ThemedText } from "./ui/ThemedText";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

type PlayerResult = {
  name: string;
  clan_tag?: string;
  clan_name?: string;
  league?: string;
  th?: number;
  tag: string;
  trophies?: number;
  imageUrl: string;
  leagueIcon?: string;
};

type ClanResult = {
  name: string;
  tag: string;
  location?: string;
  clanLevel?: number;
  warFrequency?: number;
  warLeague?: string;
  members: number;
  imageUrl: string;
  leagueIcon?: string;
  type: string;
  language?: string;
};

export const PlayerResult = ({ name, clan_tag, clan_name, league, th, tag, trophies, imageUrl, leagueIcon }: PlayerResult) => {
  return (
    <ThemedBlockView style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View>
        <ThemedText type="subtitle">{name}</ThemedText>
        <View style={styles.strip}>
          <ThemedText>{tag}</ThemedText>
          <View style={[styles.strip, { marginStart: 10 }]}>
            <Image source={{ uri: leagueIcon }} style={styles.leagueIcon} />
            <ThemedText>{trophies}</ThemedText>
          </View>
        </View>
        <View style={styles.strip}>
          <ThemedText type="defaultSemiBold" style={styles.stat}>
            {clan_name}
          </ThemedText>
          <ThemedText style={styles.stat}>{league}</ThemedText>
        </View>
      </View>
    </ThemedBlockView>
  );
};

export const ClanResult = ({ name, language, clanLevel, warLeague, members, tag, type, imageUrl, leagueIcon }: ClanResult) => {
  return (
    <ThemedBlockView style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View>
        <View style={styles.strip}>
        <ThemedText type="subtitle">{name} </ThemedText>
        {/* <ThemedText type="secondarySemiBold"> Level {clanLevel}</ThemedText> */}
        </View>
        <View style={styles.strip}>
          <ThemedText>{tag}</ThemedText>
          <View style={[styles.strip, { marginStart: 10 }]}>
            <Image source={{ uri: leagueIcon }} style={styles.leagueIcon} />
            <ThemedText type="defaultSemiBold">{warLeague}</ThemedText>
          </View>
        </View>
        <View style={styles.strip}>
          <View style={styles.strip}>
            <Icon name="email-outline" size={16} color={'#dbdbdb'} />
            <ThemedText style={styles.stat}>{type}</ThemedText>
          </View>
          <View style={styles.strip}>
            <Icon name="account-multiple-outline" size={16} color={'#dbdbdb'} />
            <ThemedText style={styles.stat}>{members}/50</ThemedText>
          </View>
        </View>
      </View>
    </ThemedBlockView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  image: {
    width: 75,
    height: 75,
    marginEnd: 10,
    resizeMode: "center",
  },
  stat: {
    paddingHorizontal: 2,
    borderRadius: 3,
    textAlign: "center",
    marginEnd: 5,
  },
  leagueIcon: {
    width: 15,
    height: 15,
    marginEnd: 5,
  },
  strip: {
    flexDirection: "row",
    alignItems: "center",
  },
});
