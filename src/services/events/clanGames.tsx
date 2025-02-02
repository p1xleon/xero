import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../../components/ui/ThemedText";

const getClanGamesStatus = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Calculate the start and end dates for Clan Games (22nd to 28th of the month)
  const getClanGamesStart = () => new Date(currentYear, currentMonth, 22, 13, 30); // 22nd of the month at 1:30 PM IST
  const getClanGamesEnd = () => new Date(currentYear, currentMonth, 28, 13, 30); // 28th of the month at 1:30 PM IST

  let clanGamesStart = getClanGamesStart();
  let clanGamesEnd = getClanGamesEnd();

  // If the current date is past the 28th, calculate the next month's Clan Games start and end
  if (now > clanGamesEnd) {
    clanGamesStart = new Date(currentYear, currentMonth + 1, 22, 13, 30);
    clanGamesEnd = new Date(currentYear, currentMonth + 1, 28, 13, 30);
  }

  // Check if the event is currently active (22nd to 28th)
  if (now >= clanGamesStart && now < clanGamesEnd) {
    return { isActive: true, timeLeft: clanGamesEnd };
  }

  // If the event is not active, show time until next Clan Games start
  return { isActive: false, timeLeft: clanGamesStart };
};

const ClanGames = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState<Date | null>(null);

  useEffect(() => {
    const { isActive, timeLeft } = getClanGamesStatus();
    setIsActive(isActive);
    setTimeLeft(timeLeft);
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
    <View style={[styles.container, { borderColor: isActive ? "limegreen" : "#000000" }]}>
      <ThemedText>Clan Games</ThemedText>
      {isActive && (
        <ThemedText type="subtextBold" style={{ color: "limegreen" }}>
          (Active)
        </ThemedText>
      )}
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
    alignItems: "center",
    borderWidth: 2,
    justifyContent: "center",
  },
});

export default ClanGames;
