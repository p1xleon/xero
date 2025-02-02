import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../../components/ui/ThemedText";

const getSeasonEndTime = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Calculate the next season reset on the 1st of the next month at 1:30 PM IST
  return new Date(currentYear, currentMonth + 1, 1, 13, 30);
};

const SeasonEnd = () => {
  const [timeLeft, setTimeLeft] = useState<Date | null>(null);

  useEffect(() => {
    setTimeLeft(getSeasonEndTime());
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
      <ThemedText>Season End</ThemedText>
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

export default SeasonEnd;
