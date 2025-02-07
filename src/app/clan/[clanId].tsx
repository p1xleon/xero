import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Clan as ClanProps, ClashKingClan } from "../../types/Clan";
import { fetchClan, fetchClanDetails } from "../../services/api/clash";
import ClanBadges from "../../components/ClanBadges";
import ClanMember from "../../components/ClanMember";
import { ThemedText } from "../../components/ui/ThemedText";
import { ThemedView } from "../../components/ui/ThemedView";
import { RoleLabels, TypeLabels } from "../../constants/LabelMaps";
import { TownHallMap } from "../../constants/HallMaps";
import { useLocalSearchParams } from "expo-router";

const Clan = () => {
  const { clanId } = useLocalSearchParams<{ clanId: string }>();
  const [clanDetails, setClanDetails] = useState<ClanProps>();

  useEffect(() => {
    const clanTag = clanId;
    const getClan = async () => {
      try {
        const clan = await fetchClanDetails(clanTag);
        setClanDetails(clan);
      } catch (error) {
        console.error("error fetching clan", error);
      }
    };
    getClan();
  }, []);

  return (
    <ThemedView>
      {clanDetails && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* main banner */}
          <View style={styles.clanBanner}>
            <Image
              source={{
                uri: clanDetails?.badgeUrls.large,
              }}
              style={styles.clanBadge}
            />
            <ThemedText type="subtitle">{clanDetails?.name}</ThemedText>
            <ThemedText type="secondarySemiBold">{clanDetails?.tag}</ThemedText>
            {/* <ThemedText type="secondarySemiBold">Level {clanDetails?.clanLevel}</ThemedText> */}
          </View>
          <ClanBadges
            type={TypeLabels[clanDetails.type]}
            location={clanDetails.location}
            clanPoints={clanDetails.clanPoints}
            clanBuilderBasePoints={clanDetails.clanBuilderBasePoints}
            clanCapitalPoints={clanDetails.clanCapitalPoints}
            capitalLeague={clanDetails.capitalLeague}
            requiredTrophies={clanDetails.requiredTrophies}
            warFrequency={clanDetails.warFrequency}
            warWinStreak={clanDetails.warWinStreak}
            warWins={clanDetails.warWins}
            isWarLogPublic={clanDetails.isWarLogPublic}
            warLeague={clanDetails.warLeague}
            members={clanDetails.members}
            requiredTownhallLevel={clanDetails.requiredTownhallLevel}
            requiredBuilderBaseTrophies={clanDetails.requiredBuilderBaseTrophies}
            clanCapital={clanDetails.clanCapital}
            chatLanguage={clanDetails.chatLanguage}
            isFamilyFriendly={clanDetails.isFamilyFriendly}
            labels={clanDetails.labels}
          />
          <View style={{ marginVertical: 10 }}>
            <ThemedText type="defaultSemiBold">{clanDetails?.description}</ThemedText>
          </View>
          <View>
            <ThemedText type="subtitle">Clan Members</ThemedText>

            <FlatList
              data={clanDetails.memberList}
              keyExtractor={(item) => item.tag}
              renderItem={({ item }) => (
                <ClanMember
                  clanRank={item.clanRank}
                  name={item.name}
                  role={RoleLabels[item.role]}
                  thIcon={TownHallMap[item.townHallLevel]}
                  expLevel={item.expLevel}
                  leagueIcon={item.league.iconUrls.medium ? item.league.iconUrls.medium : item.league.iconUrls.small}
                  trophies={item.trophies}
                />
              )}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  clanBanner: {
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#414141",
    borderRadius: 7,
    padding: 10,
    justifyContent: "center",
  },
  clanBadge: {
    width: 100,
    height: 100,
  },
});

export default Clan;
