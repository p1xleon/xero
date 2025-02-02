import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../../components/ui/ThemedText';

const getLastMondayOfMonth = (year: number, month: number) => {
  const date = new Date(year, month + 1, 0); // Get the last day of the month
  const dayOfWeek = date.getDay();
  const daysToLastMonday = (dayOfWeek === 0 ? 7 : dayOfWeek) - 1; // Days to last Monday
  date.setDate(date.getDate() - daysToLastMonday);
  date.setHours(10, 30, 0, 0); // 10:30 AM IST
  return date;
};

const getLeagueResetTime = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  let leagueResetTime = getLastMondayOfMonth(currentYear, currentMonth);

  // If current time is past this month's last Monday, calculate next month's
  if (now > leagueResetTime) {
    leagueResetTime = getLastMondayOfMonth(currentYear, currentMonth + 1);
  }

  return leagueResetTime;
};

const LeagueReset = () => {
  const [timeLeft, setTimeLeft] = useState<Date | null>(null);

  useEffect(() => {
    setTimeLeft(getLeagueResetTime());
  }, []);

  const getTimeRemaining = () => {
    if (!timeLeft) return '';

    const now = new Date();
    const remainingTime = timeLeft.getTime() - now.getTime();
    const days = Math.floor(remainingTime / (1000 * 3600 * 24));
    const hours = Math.floor((remainingTime % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((remainingTime % (1000 * 3600)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <View style={styles.container}>
      <ThemedText>League Reset</ThemedText>
      <ThemedText  type="defaultSemiBold">{getTimeRemaining()}</ThemedText>
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


export default LeagueReset;
