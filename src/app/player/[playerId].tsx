import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import { ClashKingPlayer, Player as PlayerProps } from "../../types/Player";
import { fetchPlayer, fetchPlayerDetails } from "../../services/api/clash";
import { ThemedView } from "../../components/ui/ThemedView";
import { TownHallMap } from "../../constants/HallMaps";
import PlayerBadges from "../../components/PlayerBadges";
import { RoleLabels } from "../../constants/LabelMaps";
import PlayerStats from "../../components/PlayerStats";
import { useLocalSearchParams } from "expo-router";
import { formatLastOnline } from "../../services/utilities";

const Player = () => {
  const { playerId } = useLocalSearchParams<{ playerId: string }>();
  const [player, setPlayer] = useState<ClashKingPlayer>();

  useEffect(() => {
    const playerTag = playerId;
    const getPlayer = async () => {
      try {
        const player = await fetchPlayer(playerTag);
        setPlayer(player);
      } catch (error) {
        console.error("Error getting player details", error);
        throw error;
      }
    };
    getPlayer();
  }, []);

  return (
    <ThemedView>
      {player && (
        <ScrollView>
          <Banner
            name={player.name}
            tag={player.tag}
            imageUrl={TownHallMap[player.townhall]}
            last_online={formatLastOnline(player.last_online)}
          />
          <PlayerBadges
            townhall={player.townhall}
            // builderHallLevel={player.builderHallLevel}
            // expLevel={player.expLevel}
            // bestTrophies={player.bestTrophies}
            league={player.league}
            trophies={player.trophies}
            // builderBaseTrophies={player.builderBaseTrophies}
            // builderBaseLeague={player.builderBaseLeague}
            warStars={player.warStars}
            // warPreference={player.warPreference}
            // donations={player.donations}
            // donationsReceived={player.donationsReceived}
            // attackWins={player.attackWins}
            // defenseWins={player.defenseWins}
            clanCapitalContributions={player.clanCapitalContributions}
            // role={RoleLabels[player.role]}
            // bestBuilderBaseTrophies={player.bestBuilderBaseTrophies}
            // townHallWeaponLevel={player.townHallWeaponLevel}
            // labels={player.labels}
          />
          {/* <PlayerStats heroes={player.heroes} heroEquipment={player.heroEquipment} troops={player.troops} spells={player.spells} /> */}
        </ScrollView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({});

export default Player;
