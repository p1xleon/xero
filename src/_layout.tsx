import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./services/auth/firebaseConfig";
import { router } from "expo-router";
import { View, Text } from "react-native";

export default function Layout() {
  const [loading, setLoading] = useState(true); // Loading state for initial auth check
  const [user, setUser] = useState<User | null>(null); // Auth user state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user when auth state changes
      setLoading(false); // Once auth state is determined, stop loading
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);
  useEffect(() => {
    if (!loading) {
      // Redirect based on user state
      if (user) {
        // If user is logged in, go to home page
        router.replace("(auth)");
      } else {
        // If user is not logged in, go to welcome page
        router.replace("/welcome");
      }
    }
  }, [loading, user, router]);

  if (loading) {
    // Show loading state while determining auth status
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return null;
}
