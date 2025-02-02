import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../../components/ui/ThemedText";

const getTraderResetTime = () => {
  const now = new Date();

  // Calculate the next Tuesday at 1:30 PM IST
  const getNextTuesday = () => {
    const nextTuesday = new Date(now);
    nextTuesday.setDate(now.getDate() + ((2 - now.getDay() + 7) % 7)); // Find the next Tuesday
    nextTuesday.setHours(13, 30, 0, 0);
    return nextTuesday;
  };

  let nextTuesday = getNextTuesday();

  // If it's already past this week's Tuesday 1:30 PM, move to next week
  if (now >= nextTuesday) {
    nextTuesday.setDate(nextTuesday.getDate() + 7);
  }

  return nextTuesday;
};

const TraderReset = () => {
  const [timeLeft, setTimeLeft] = useState<Date | null>(null);

  useEffect(() => {
    setTimeLeft(getTraderResetTime());
  }, []);

  const getTimeRemaining = () => {
    if (!timeLeft) return "";

    const now = new Date();
    const remainingTime = timeLeft.getTime() - now.getTime();
    const days = Math.floor(remainingTime / (1000 * 3600 * 24));
    const hours = Math.floor((remainingTime % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((remainingTime % (1000 * 3600)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <View style={styles.container}>
      <ThemedText>Trader Refresh</ThemedText>
      <ThemedText type="defaultSemiBold">{getTimeRemaining()}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%", //for 2 cards on one row
    backgroundColor: "#000000",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    alignItems: "center",
    borderWidth: 2,
    justifyContent: "center",
  },
});

export default TraderReset;
