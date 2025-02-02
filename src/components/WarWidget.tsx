import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedText } from "./ui/ThemedText";
import { ThemedBlockView } from "./ui/ThemedView";
import { getWar } from "../services/api/clash";
import { Loading } from "./ui/Loading";
import { WarStatusLabels } from "../constants/LabelMaps";
import Snackbar from "react-native-snackbar";

const WarWidget = () => {
  const [warDetails, setWarDetails] = useState<War>();

  useEffect(() => {
    const getWarDetails = async () => {
      const clanTag = "#YVUVCU9J";
      try {
        const war = await getWar(clanTag);
        setWarDetails(war);
      } catch (error) {
        // console.error("error fetching clan", error);
        Snackbar.show({
          text: `Could not get Clan War Info`,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    };
    getWarDetails();
  }, []);

  if (!warDetails) return <Loading />;

  return (
    <ThemedBlockView>
      {warDetails ? (
        <View style={styles.container}>
          <View style={styles.clan}>
            <Image source={{ uri: warDetails.clan.badgeUrls.large }} style={styles.clanBadge} />
            <View>
              <ThemedText type="subtextBold">{warDetails.clan.name}</ThemedText>
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ThemedText type="defaultSemiBold">{WarStatusLabels[warDetails.state]}</ThemedText>
            {warDetails.state === "warEnded" && (
              <ThemedText type="defaultSemiBold">
                {warDetails.clan.stars &&
                warDetails.clan.destructionPercentage > warDetails.opponent.stars &&
                warDetails.opponent.destructionPercentage
                  ? "Victory"
                  : "Defeat"}
              </ThemedText>
            )}
            <View style={styles.strip}>
              <ThemedText type="subtitle">{warDetails.clan.stars} -</ThemedText>
              <ThemedText type="subtitle"> {warDetails.opponent.stars}</ThemedText>
            </View>
            <View style={styles.strip}>
              <ThemedText type="secondarySemiBold">{warDetails.clan.destructionPercentage.toPrecision(4)}% </ThemedText>
              <ThemedText type="secondarySemiBold">- {warDetails.opponent.destructionPercentage.toPrecision(4)}%</ThemedText>
            </View>
          </View>
          <View style={styles.clan}>
            <Image source={{ uri: warDetails.opponent.badgeUrls.large }} style={styles.clanBadge} />
            <View>
              <ThemedText type="subtextBold">{warDetails.opponent.name}</ThemedText>
            </View>
          </View>
        </View>
      ) : (
        <ThemedText type="secondarySemiBold">The clan has private war log</ThemedText>
      )}
    </ThemedBlockView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clanBadge: {
    width: 80,
    height: 80,
  },
  clan: {
    justifyContent: "center",
    width: "25%",
    alignItems: "center",
  },
  strip: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  warStatus: {
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
  },
});

export default WarWidget;
