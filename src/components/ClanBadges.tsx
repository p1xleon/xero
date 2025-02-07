import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Badge from "./Badge";
import { Clan, ClashKingClan } from "../types/Clan";
import { CapitalHallMap } from "../constants/CapitalMaps";
import { LeagueMap } from "../constants/LeagueMaps";
import { TownHallMap } from "../constants/HallMaps";

type ClanbadgeProps = Omit<Clan, "description" | "tag" | "name" | "badgeUrls" | "clanLevel" | "memberList">;
// type ClanbadgeProps = Omit<ClashKingClan, "tag" | "name" | "memberList"| "level">;

const ClanBadges = ({ ...props }: ClanbadgeProps) => {
  return (
    <View style={styles.container}>
      {/* clan league, home village points, builder base points */}
      <View style={styles.badgeLine}>
        {props.warLeague && <Badge value={props.warLeague.name} imageUrl={LeagueMap[props.warLeague.name]} />}
        <Badge value={props.clanPoints} imageUrl="https://static.wikia.nocookie.net/clashofclans/images/c/cd/Trophy.png" />
        <Badge value={props.clanBuilderBasePoints} imageUrl="https://static.wikia.nocookie.net/clashofclans/images/6/63/TrophyB.png" />
      </View>

      {/* wars won, war win streak, war frequency */}
      <View style={styles.badgeLine}>
        <Badge value={props.warWins} imageUrl="https://www.clashofstats.com/_nuxt/img/global-war.e3db7ee.png" />
        <Badge value={props.warWinStreak} imageUrl="https://www.clashofstats.com/_nuxt/img/global-warwinstreak.9d00cdb.png" />
        <Badge
          value={props.warFrequency}
          imageUrl="https://github.com/ClashKingInc/ClashKingAssets/blob/main/assets/icons/Icon_DC_War.png?raw=true"
        />
      </View>

      {/* type, members,  required th level  */}
      <View style={styles.badgeLine}>
        <Badge value={props.type} imageUrl="https://img.icons8.com/?size=48&id=MFd4aKzItnZK&format=png" />
        <Badge value={`${props.members}/50`} imageUrl="https://cdn-icons-png.flaticon.com/128/9800/9800965.png" />
        <Badge value={props.requiredTownhallLevel} imageUrl={TownHallMap[props.requiredTownhallLevel]} />
      </View>

      {/* clan cap league, clan cap hall level, clan cap points */}
      <View style={styles.badgeLine}>
        {props.capitalLeague.name && (
          <Badge value={props.capitalLeague.name} imageUrl="https://static.wikia.nocookie.net/clashofclans/images/2/2d/TrophyC.png" />
        )}
        <Badge value={props.clanCapital.capitalHallLevel} imageUrl={CapitalHallMap[props.clanCapital.capitalHallLevel]} />
        <Badge
          value={props.clanCapitalPoints}
          imageUrl="https://static.wikia.nocookie.net/clashofclans/images/a/a0/GoldC.png/revision/latest/scale-to-width-down/80?cb=20220502131424"
        />
      </View>

      {/* locatoin, language */}
      <View style={styles.badgeLine}>
        <Badge value={props.chatLanguage.name} imageUrl="https://img.icons8.com/?size=48&id=31016&format=png" />
        <Badge value={props.location.name} imageUrl="https://cdn-icons-png.flaticon.com/128/1029/1029546.png" />
      </View>
    </View>
  );
};

export default ClanBadges;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeLine: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
});
