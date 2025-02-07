import { Modal, StyleSheet, Image, TouchableOpacity, View, Alert } from "react-native";
import React, { useState } from "react";
import { ThemedBlockView, ThemedView } from "./ui/ThemedView";
import ThemedInput from "./ui/ThemedInput";
import Button from "./ui/Button";
import { ThemedText } from "./ui/ThemedText";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { addProfile } from "../services/auth/firebase";
import { fetchPlayer, fetchPlayerDetails } from "../services/api/clash";
import { ClashKingPlayer, Player } from "../types/Player";
import { TownHallMap } from "../constants/HallMaps";
import Snackbar from "react-native-snackbar";

interface ProfileModalProps {
  isVisible: boolean;
  close: () => void;
  onVillageAdded: () => void;
}

const ProfileModal = ({ isVisible, close, onVillageAdded }: ProfileModalProps) => {
  const [playerTag, setPlayerTag] = useState<string>("");
  const [optedIn, setOptedIn] = useState<boolean>(false);
  const [player, setPlayer] = useState<Player>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const getPlayer = async () => {
    setErrorMessage("");
    try {
      const player = await fetchPlayerDetails(playerTag);
      setPlayer(player);
    } catch (error: any) {
      setErrorMessage("Something went wrong");
      console.error('oops')
      if (error.response.status === 404) {
          setErrorMessage("Could not find village, check the player tag and try again");
      }
    }
  };

  const addVillage = async () => {
    try {
      setPlayerTag(playerTag);
      setOptedIn(false);
      await addProfile(playerTag, optedIn);
      Alert.alert("Alright Chief!", "Village was added successfully");
      onVillageAdded();
      handleClose();
    } catch (error) {
      Snackbar.show({
        text: "Oops! Could not add village, please try again later",
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const clearFields = () => {
    setPlayerTag("");
    setPlayer(undefined);
    setOptedIn(false);
  };
  const handleClose = () => {
    clearFields();
    close();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent statusBarTranslucent>
      <ThemedBlockView style={styles.overlay}>
        <ThemedBlockView style={styles.container}>
          <View style={styles.header}>
            <ThemedText type="subtitle">Add a village</ThemedText>
            <TouchableOpacity onPress={handleClose}>
              <Icon name="close-circle-outline" color="tomato" size={30} />
            </TouchableOpacity>
          </View>
          <ThemedInput
            value={playerTag.toUpperCase()}
            placeholder="Enter a player tag"
            onSubmitEditing={getPlayer}
            onChangeText={setPlayerTag}
            autoCapitalize="characters"
          />
          {player && (
            <View style={styles.player}>
              <Image source={{ uri: TownHallMap[player.townHallLevel] }} style={styles.image} />
              <View>
                <ThemedText type="subtitle" style={{ fontSize: 24 }}>
                  {player.name}
                </ThemedText>
                <View style={styles.strip}>
                  <Image source={{ uri: player.clan.badgeUrls.medium }} style={styles.clanbadge} />
                  <ThemedText type="secondarySemiBold">{player.tag}</ThemedText>
                </View>
              </View>
            </View>
          )}
          <Button title={player ? "Add Village" : "Search Player"} onPress={player ? addVillage : getPlayer} />
          {errorMessage !== "" && <ThemedText type="subtext" style={styles.error}>{errorMessage}</ThemedText>}
        </ThemedBlockView>
      </ThemedBlockView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "50%",
    marginTop: "auto",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  player: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#7c7c7c",
    borderRadius: 10,
    paddingVertical: 5,
  },
  image: {
    width: 65,
    height: 65,
    marginHorizontal: 10,
  },
  clanbadge: {
    width: 20,
    height: 20,
    marginEnd: 2,
  },
  strip: {
    flexDirection: "row",
    alignItems: "center",
  },
  addIcon: {
    marginEnd: 10,
  },
  error: {
    color: "tomato",
    textAlign: "center",
    marginBottom: 10,
  },
});
export default ProfileModal;
