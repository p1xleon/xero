import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { fetchProfiles, toggleOptedIn } from "../../services/auth/firebase";
import { ThemedText } from "../../components/ui/ThemedText";
import { ThemedView } from "../../components/ui/ThemedView";
import { Loading } from "../../components/ui/Loading";
import ProfileModal from "../../components/ProfileModal";
import { fetchPlayer, fetchPlayerDetails } from "../../services/api/clash";
import { auth } from "../../services/auth/firebaseConfig";
import Button from "../../components/ui/Button";
import BaseCard from "../../components/BaseCard";
import Snackbar from "react-native-snackbar";
import Header from "../../components/ui/Header";
import { formatLastOnline } from "../../services/utilities";

interface Profile {
  playerTag: string;
  optedIn: boolean;
  name: string;
  townhall: number;
  last_online: number;
  // clanName?: string;
  // clanBadge?: string;
}

const Profile = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
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

  const toggleWarPref = async (playerTag: string, currentStatus: boolean) => {
    await toggleOptedIn(playerTag);
    loadProfiles();
    const newStatus = !currentStatus;
    Snackbar.show({
      text: newStatus ? `Opted In ${playerTag}` : `Opted Out ${playerTag}`,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  const openModal = () => {
    setIsVisible(true);
  };

  return (
    <ThemedView>
      <Header title="profile" />
      <View>
        {loading ? (
          <View style={{ marginVertical: 20 }}>
            <Loading />
          </View>
        ) : profiles.length === 0 ? (
          <ThemedText type="subtitle" style={{ textAlign: "center", marginTop: 15 }}>
            No villages found
          </ThemedText>
        ) : (
          <>
            <ThemedText type="subtitle">Your Profiles/Villages</ThemedText>
            <FlatList
              data={profiles}
              keyExtractor={(item) => item.playerTag}
              renderItem={({ item }) => (
                <BaseCard
                  name={item.name}
                  tag={item.playerTag}
                  // clanName={item.clanName}
                  // clanBadge={item.clanBadge}
                  lastOnline= {formatLastOnline(item.last_online)}
                  thLevel={item.townhall}
                  style={{ backgroundColor: item.optedIn ? "palegreen" : "lightsalmon" }}>
                  <TouchableOpacity onPress={() => toggleWarPref(item.playerTag, item.optedIn)}>
                    <Icon
                      name={item.optedIn ? "close-circle-outline" : "check-circle-outline"}
                      color={item.optedIn ? "orangered" : "palegreen"}
                      size={38}
                    />
                  </TouchableOpacity>
                </BaseCard>
              )}
            />
          </>
        )}
      </View>
      <ProfileModal isVisible={isVisible} close={() => setIsVisible(false)} onVillageAdded={loadProfiles} />
      <View style={styles.buttonContainer}>
        <ThemedText type="subtextBold" style={{ textAlign: "center", marginBottom: 5 }}>
          Tap on the icon in the village card to toggle war preference
        </ThemedText>
        <Button title="Add village" onPress={openModal} />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    bottom: 10,
  },
  box: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default Profile;
