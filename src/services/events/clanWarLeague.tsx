import React, { useEffect, useState } from "react";
import { StyleProp, View, StyleSheet, ViewStyle } from "react-native";
import { ThemedText } from "../../components/ui/ThemedText";

const getClanWarLeagueStatus = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const eventStart = new Date(currentYear, currentMonth, 1, 13, 30); // 1st at 1:30 PM IST
  const signUpEnd = new Date(currentYear, currentMonth, 3, 13, 30); // 3rd at 1:30 PM IST (end of sign-up)
  const eventEnd = new Date(currentYear, currentMonth, 11, 13, 30); // 11th at 1:30 PM IST

  let nextEventStart = eventStart;
  if (now > eventEnd) {
    nextEventStart = new Date(currentYear, currentMonth + 1, 1, 13, 30); // 1st of next month
  }

  if (now >= eventStart && now < signUpEnd) {
    return { status: "Sign-up", timeLeft: signUpEnd };
  }

  if (now >= signUpEnd && now < eventEnd) {
    return { status: "Active", timeLeft: eventEnd };
  }

  return { status: "", timeLeft: nextEventStart };
};

const ClanWarLeague = () => {
  const [status, setStatus] = useState("");
  const [timeLeft, setTimeLeft] = useState<Date | null>(null);

  useEffect(() => {
    const { status, timeLeft } = getClanWarLeagueStatus();
    setStatus(status);
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
    <View style={[styles.container, { borderColor: status === "Active" ? "limegreen" : status === 'Sign-up' ? 'gold' : 'black' }]}>
      <ThemedText>Clan War League</ThemedText>
      {status && <ThemedText type="subtextBold" style={{ color: status === "Active" ? "limegreen" : "gold" }}>({status})</ThemedText>}
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

export default ClanWarLeague;
