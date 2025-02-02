import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ClanGames from "../services/events/clanGames";
import ClanWarLeague from "../services/events/clanWarLeague";
import LeagueReset from "../services/events/league";
import RaidWeekend from "../services/events/raidWeekend";
import SeasonEnd from "../services/events/season";
import TraderReset from "../services/events/trader";
import { ThemedBlockView } from "../components/ui/ThemedView";
import { ThemedText } from "../components/ui/ThemedText";

const Events = () => {
  return (
    <ThemedBlockView style={styles.container}>
      <ThemedText type="secondarySemiBold" style={styles.header}>
        Recurring in-game events
      </ThemedText>
      <View style={styles.grid}>
        <ClanWarLeague />
        <RaidWeekend />
        <ClanGames />
        <TraderReset />
        <SeasonEnd />
        <LeagueReset />
      </View>
    </ThemedBlockView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: '#555555'
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  header: {
    marginVertical: 10,
  },
});

export default Events;
