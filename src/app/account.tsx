import { StyleSheet, Image, View, TextInput, FlatList, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedBlockView, ThemedView } from "../components/ui/ThemedView";
import { ThemedText } from "../components/ui/ThemedText";
import { deleteProfile, fetchProfiles } from "../services/auth/firebase";
import { fetchPlayer, fetchPlayerDetails } from "../services/api/clash";
import { Loading } from "../components/ui/Loading";
import { TownHallMap } from "../constants/HallMaps";
import { auth } from "../services/auth/firebaseConfig";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Snackbar from "react-native-snackbar";
import { formatLastOnline } from "../services/utilities";

interface Profile {
  playerTag: string;
  optedIn: boolean;
  name: string;
  townhall: number;
  last_online: number;
  // clanName?: string;
  // clanBadge?: string;
}

const Account = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const user = auth.currentUser;

  const loadProfiles = async () => {
    setLoading(true);
    const storeProfiles = await fetchProfiles();
    const villages = await Promise.all(
      storeProfiles.map(async (profile: { playerTag: string; optedIn: string }) => {
        try {
          const village = await fetchPlayer(profile.playerTag);
          if (!village) return null;
          return {
            playerTag: profile.playerTag,
            optedIn: profile.optedIn,
            name: village.name,
            townhall: village.townhall,
            last_online: village.last_online,
            // clanName: village.clan?.name,
            // clanBadge: village.clan?.badgeUrls.medium,
          };
        } catch (error) {
          // console.error("Error fetching player details", error);
          return { ...profile, name: "Chief", townhall: 1 };
        }
      })
    );
    setProfiles(villages.filter((v) => v !== null)); // remove null entries
    setLoading(false);
  };

  useEffect(() => {
    loadProfiles();
  }, [user]);

  const handleDelete = async (playerTag: string) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this village?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteProfile(playerTag);
            setProfiles((prevProfiles) => prevProfiles.filter((p) => p.playerTag !== playerTag));
            Snackbar.show({
              text: `Deleted village ${playerTag}`,
              duration: Snackbar.LENGTH_SHORT,
            });
          } catch (error) {
            Snackbar.show({
              text: `Error deleting ${playerTag}. Please try again later`,
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        },
      },
    ]);
  };

  return (
    <ThemedBlockView>
      {loading ? (
        <View style={{ marginVertical: 20 }}>
          <Loading />
        </View>
      ) : profiles.length === 0 ? (
        <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          No villages found
        </ThemedText>
      ) : (
        <>
          <FlatList
            data={profiles}
            keyExtractor={(item) => item.playerTag}
            renderItem={({ item }) => (
              <View style={styles.profile}>
                <View style={styles.strip}>
                  <Image source={{ uri: TownHallMap[item.townhall] }} style={styles.thImage} />
                  <View>
                    <ThemedText type="subtitle" style={{ color: "#d8d8d8" }}>
                      {item.name}
                    </ThemedText>
                    <ThemedText type="subtextBold" style={{ color: "#797979" }}>
                      {item.playerTag}
                    </ThemedText>
                    <View style={styles.strip}>
                      {/* <Image source={{ uri: item.clanBadge }} style={styles.clanbadge} /> */}
                      <ThemedText type="subtextBold" style={{ color: "#7a7a7a" }}>
                        {formatLastOnline(item.last_online)}
                      </ThemedText>
                    </View>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleDelete(item.playerTag)}>
                  <Icon name="delete-outline" size={30} color="tomato" />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
    </ThemedBlockView>
  );
};

const styles = StyleSheet.create({
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 10,
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
  },
});

export default Account;
