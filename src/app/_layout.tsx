import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { Stack, useRouter } from "expo-router";
import { auth } from "../services/auth/firebaseConfig";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Loading } from "../components/ui/Loading";
import { ThemedView } from "../components/ui/ThemedView";

export default function Layout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("(tabs)");
      } else {
        router.replace("/welcome");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <ThemedView>
        <Loading />
      </ThemedView>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#141414",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ title: "About" }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="player/[playerId]" options={{ title: "Player" }} />
        <Stack.Screen name="clan/[clanId]" options={{ title: "Clan" }} />
        <Stack.Screen name="playerSearch" options={{ title: "Search for players" }} />
        <Stack.Screen name="clanSearch" options={{ title: "Search for clans" }} />
        <Stack.Screen name="settings" options={{ title: "Settings" }} />
        <Stack.Screen name="changelog" options={{ title: "Changelog" }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
