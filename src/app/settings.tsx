import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { getAuth, signOut } from "firebase/auth";
import { router } from "expo-router";
import React from "react";
import { ThemedText } from "../components/ui/ThemedText";
import { ThemedView } from "../components/ui/ThemedView";
import { auth } from "../services/auth/firebaseConfig";
import Account from "./account";
import Header from "../components/ui/Header";

const Settings = () => {
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User signed out successfully.");
      router.replace("/logIn");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const user = auth.currentUser;
  return (
    <ThemedView>
      <View>
        <ThemedText type="subtextBold">ACCOUNT</ThemedText>
        <View style={styles.box}>
          <TouchableOpacity>
            <ThemedText type="subtitle">{user?.displayName}</ThemedText>
            <ThemedText type="defaultSemiBold">{user?.email}</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <ThemedText type="subtextBold">VILLAGES</ThemedText>
        <View style={styles.box}>
          <Account />
        </View>
      </View>

      <View style={styles.box}>
        <TouchableOpacity style={styles.link} onPress={() => router.push("/about")}>
          <Icon name="information" size={24} color={"#b9b9b9"} style={{ marginRight: 10 }} />
          <ThemedText type="subtitle">About</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <TouchableOpacity style={styles.link} onPress={handleSignOut}>
          <Icon name="logout-variant" size={24} color={"#ee280d"} style={{ marginRight: 10 }} />
          <ThemedText type="subtitle">Logout</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    marginBottom: 10,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
});

export default Settings;
