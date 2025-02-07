import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Badge from "./Badge";
import { CapitalHallMap } from "../constants/CapitalMaps";
import { LeagueMap } from "../constants/LeagueMaps";
import { TownHallMap } from "../constants/HallMaps";
import { ClashKingPlayer, Player } from "../types/Player";
import { getRandomImage } from "../services/utilities";

type PlayerBadgeProps = Omit<Player, "name" | "tag" | "clan" | "playerHouse" | "troops" | "spells" | "heroes" | "heroEquipment" | "achievements">;
// type PlayerBadgeProps = Omit<ClashKingPlayer, "name" | "tag" | "last_online">;

const PlayerBadges = ({ ...props }: PlayerBadgeProps) => {
  return (
    <View style={styles.container}>
      {/* townHallLevel, expLevel trophies builderBaseTrophies */}
      <Badge value={`TH${props.townHallLevel}`} imageUrl={TownHallMap[props.townHallLevel]} />

      <Badge
        value={`BH${props.builderHallLevel}`}
        imageUrl={TownHallMap[props.builderHallLevel]}
      />
      <Badge
        value={props.expLevel}
        imageUrl="https://static.wikia.nocookie.net/clashofclans/images/1/1a/XP.png"
      />
      <Badge
        value={props.trophies}
        imageUrl={
          "https://static.wikia.nocookie.net/clashofclans/images/c/c0/Unranked_League.png/revision/latest/scale-to-width-down/92?cb=20171003011534"
        }
      />
      <Badge value={props.builderBaseTrophies} imageUrl="https://static.wikia.nocookie.net/clashofclans/images/6/66/Icon_Versus_Trophy.png" />

      {/* league, builderBaseLeague */}
      {props.league && (
        <Badge
          value={props.league.name ? props.league.name : "Unranked"}
          imageUrl={
            "https://static.wikia.nocookie.net/clashofclans/images/c/c0/Unranked_League.png/revision/latest/scale-to-width-down/92?cb=20171003011534"
          }
        />
      )}
      

      {/* trophies, bestTrophies, war preference */}
      <Badge
        value={props.warStars}
        imageUrl="https://github.com/ClashKingInc/ClashKingAssets/blob/main/assets/icons/Icon_BB_Empty_Star.png?raw=true"
      />
      <Badge
        value={props.warPreference === "in" ? "Opted In" : "Opted Out"}
        imageUrl={
          props.warPreference === "in"
            ? "https://github.com/ClashKingInc/ClashKingAssets/blob/main/assets/icons/Icon_HV_In.png?raw=true"
            : "https://github.com/ClashKingInc/ClashKingAssets/blob/main/assets/icons/Icon_HV_Out.png?raw=true"
        }
      />
      <Badge
        value={props.bestTrophies}
        imageUrl="https://github.com/ClashKingInc/ClashKingAssets/blob/main/assets/icons/Icon_HV_Trophy_Best.png?raw=true"
      />
      <Badge value={props.bestBuilderBaseTrophies} imageUrl="https://static.wikia.nocookie.net/clashofclans/images/6/63/TrophyB.png" />

      {/* attacks, defenses, donations */}
      <Badge
        value={props.attackWins}
        imageUrl="https://github.com/ClashKingInc/ClashKingAssets/blob/main/assets/icons/Icon_HV_Attacks_No_Shield.png?raw=true"
      />
      <Badge
        value={props.defenseWins}
        imageUrl="https://github.com/ClashKingInc/ClashKingAssets/blob/main/assets/icons/Icon_HV_Shield.png?raw=true"
      />
      <Badge value={props.donations} imageUrl="https://cdn-icons-png.flaticon.com/128/14025/14025345.png" />
      <Badge value={props.donationsReceived} imageUrl="https://cdn-icons-png.flaticon.com/128/5974/5974734.png" />

      {/* cc points, role,*/}
      <Badge
        value={props.clanCapitalContributions}
        imageUrl="https://github.com/ClashKingInc/ClashKingAssets/blob/main/assets/icons/Icon_CC_Resource_Capital_Gold_small.png?raw=true"
      />
      {props.townHallWeaponLevel && <Badge value={props.townHallWeaponLevel} imageUrl={TownHallMap[props.townHallLevel]} />}
      <Badge value={props.role} imageUrl={getRandomImage()} />
      {props.labels && props.labels.map((label) => <Badge key={label.id} value={label.name} imageUrl={label.iconUrls.medium} />)}
    </View>
  );
};

export default PlayerBadges;

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
