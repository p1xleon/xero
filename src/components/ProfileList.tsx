import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchAllProfiles } from "../services/auth/firebase";
import { fetchPlayer, fetchPlayerDetails } from "../services/api/clash";
import { ThemedBlockView } from "./ui/ThemedView";
import { Loader } from "./ui/Loading";
import { ThemedText } from "./ui/ThemedText";
import BaseCard from "./BaseCard";
import { formatLastOnline } from "../services/utilities";

const ProfileList = () => {
  const [allProfiles, setAllProfiles] = useState<any[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState<boolean>(true);

  useEffect(() => {
    const loadAllProfiles = async () => {
      setLoadingProfiles(true);
      try {
        const storedProfiles = await fetchAllProfiles(); // Fetch all profiles from Firestore
        const villages = await Promise.all(
          storedProfiles.map(async (profile) => {
            try {
              const village = await fetchPlayer(profile.playerTag); // Fetch player details from Clash API
              if (!village) return null;
              return {
                playerTag: profile.playerTag,
                optedIn: profile.optedIn,
                name: village.name,
                townhall: village.townhall,
                lastOnline: village.last_online,
                // clanName: village.clan?.name,
                // clanBadge: village.clan?.badgeUrls.medium,
              };
            } catch (error) {
              // console.error("Error fetching player details", error);
              return { ...profile, name: "Chief", townhall: 1 }; // Default values if error occurs
            }
          })
        );
        setAllProfiles(villages.filter((v) => v !== null)); // Remove null entries
      } catch (error) {
        console.error("Failed to load profiles", error);
      }
      setLoadingProfiles(false);
    };

    loadAllProfiles();
  }, []);

  return (
    <ThemedBlockView style={{flex: 1}}>
      {loadingProfiles ? (
        <Loader />
      ) : allProfiles.length === 0 ? (
        <ThemedText type="subtitle" style={{ textAlign: "center", marginTop: 15 }}>
          No profiles found
        </ThemedText>
      ) : (
        <View style={styles.warPrefs}>
          <ThemedText type="secondarySemiBold">Clan Members War Preferences</ThemedText>
          <FlatList
            data={allProfiles}
            keyExtractor={(item) => item.playerTag}
            renderItem={({ item }) => (
              <BaseCard
                name={item.name}
                tag={item.playerTag}
                // clanName={item.clanName}
                // clanBadge={item.clanBadge}
                thLevel={item.townhall}
                lastOnline={formatLastOnline(item.lastOnline)}
                style={{ backgroundColor: item.optedIn ? "palegreen" : "lightsalmon" }}
              />
            )}
          />
        </View>
      )}
    </ThemedBlockView>
  );
};

const styles = StyleSheet.create({
  warPrefs: {
    marginTop: 10,
  },
});

export default ProfileList;
