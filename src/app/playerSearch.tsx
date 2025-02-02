import { ActivityIndicator, FlatList, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../components/ui/ThemedView";
import ThemedInput from "../components/ui/ThemedInput";
import { searchPlayer } from "../services/api/clash";
import Button from "../components/ui/Button";
import { ThemedText } from "../components/ui/ThemedText";
import { SearchPlayerData } from "../types/Player";
import { TownHallMap } from "../constants/HallMaps";
import { Link, router } from "expo-router";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { PlayerResult } from "../components/SearchResult";
import { useThemeColor } from "../hooks/useThemeColor";

const PlayerSearch = () => {
  const [results, setResults] = useState<SearchPlayerData>();
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const color = useThemeColor({ light: "#000", dark: "#fff" }, "background");
  //search function on type, high req rate
  //   const handleSearchChange = async (query: string) => {
  //     setQuery(query);
  //     const results = await searchPlayer(query);
  //     setResults(results.items);
  //   };

  //search function, on button press
  const handleSearch = async () => {
    setLoading(true);
    const results = await searchPlayer(query);
    setResults(results.items);
  };

  if (loading) {
    <ActivityIndicator size={"large"} color={"red"} />;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search players by name"
        returnKeyType="search"
        autofocus
        onSubmitEditing={handleSearch}
      />
      {query.length === 0 && (
        <TouchableOpacity style={{ justifyContent: "center", flexDirection: "row", alignItems: "center" }} onPress={() => router.push("/clanSearch")}>
          <ThemedText type="subtitle">Search for Clans</ThemedText>
          <Icon name="chevron-right" size={32} color={color} style={{paddingTop: 3}} />
        </TouchableOpacity>
      )}
      {results && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.tag}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/player/[playerId]",
                params: { playerId: item.tag },
              }}
              style={{ width: "100%", marginVertical: 5 }}>
              <PlayerResult
                imageUrl={TownHallMap[item.th]}
                name={item.name}
                tag={item.tag}
                clan_name={item.clan_name}
                league={item.league}
                trophies={item.trophies}
                leagueIcon="https://static.wikia.nocookie.net/clashofclans/images/c/cd/Trophy.png/revision/latest?cb=20171031024226"
              />
            </Link>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Search" onPress={query.length > 0 ? handleSearch : Keyboard.dismiss} />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    alignSelf: "center",
  },
});

export default PlayerSearch;
