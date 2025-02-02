import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../../components/ui/ThemedText";

const getRaidWeekendStatus = () => {
  const now = new Date();

  // Normalize day: treat Sunday (0) as 7, so Monday=1 ... Friday=5, Saturday=6, Sunday=7.
  const normalizedDay = now.getDay() === 0 ? 7 : now.getDay();

  // Calculate this week's "active start" (Friday 12:30 PM)
  // If today is Friday or later (Friday, Saturday, Sunday), then the active period started on this week's Friday.
  // Otherwise (Monday to Thursday), the active period is yet to start and will begin on the upcoming Friday.
  let activeStart = new Date(now);
  if (normalizedDay >= 5) {
    activeStart.setDate(now.getDate() - (normalizedDay - 5));
  } else {
    activeStart.setDate(now.getDate() + (5 - normalizedDay));
  }
  activeStart.setHours(12, 30, 0, 0);

  // Active period ends 3 days later at 12:30 PM (i.e. Monday 12:30 PM)
  const activeEnd = new Date(activeStart);
  activeEnd.setDate(activeStart.getDate() + 3);

  // Determine if we are in the active period:
  if (now >= activeStart && now < activeEnd) {
    // During the active period, show active status and countdown until activeEnd.
    return { isActive: true, timeLeft: activeEnd };
  } else if (now < activeStart) {
    // Before the active period starts, count down to this week's Friday 12:30.
    return { isActive: false, timeLeft: activeStart };
  } else {
    // After the active period ends, compute next event's activeStart by adding 7 days.
    const nextActiveStart = new Date(activeStart);
    nextActiveStart.setDate(activeStart.getDate() + 7);
    return { isActive: false, timeLeft: nextActiveStart };
  }
};

const RaidWeekend = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState<Date | null>(null);

  useEffect(() => {
    const { isActive, timeLeft } = getRaidWeekendStatus();
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
      <ThemedText>Raid Weekend</ThemedText>
      {isActive && <ThemedText type="subtextBold" style={{color: 'limegreen'}}>(Active)</ThemedText>}
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

export default RaidWeekend;
