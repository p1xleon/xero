import { ActivityIndicator, FlatList, Keyboard, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../components/ui/ThemedView";
import ThemedInput from "../components/ui/ThemedInput";
import { searchClan, searchClanByTag } from "../services/api/clash";
import Button from "../components/ui/Button";
import { ThemedText } from "../components/ui/ThemedText";
import { ClanResult } from "../components/SearchResult";
import { Link, router } from "expo-router";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useThemeColor } from "../hooks/useThemeColor";
import { TypeLabels } from "../constants/LabelMaps";
import { LeagueMap } from "../constants/LeagueMaps";
import { Clan } from "../types/Clan";

const ClanSearch = () => {
  const [results, setResults] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const color = useThemeColor({ light: "#000", dark: "#fff" }, "background");

  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent empty search
    setLoading(true);
  
    try {
      const results = await searchClan(query);
      setResults(results); // `results` is now guaranteed to be an array
    } catch (error) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <ThemedView style={styles.container}>
      <ThemedInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search clans by tag (e.g. #YVUVCU9J)"
        returnKeyType="search"
        autofocus
        onSubmitEditing={handleSearch}
      />

      {query.length === 0 && (
        <TouchableOpacity
          style={{ justifyContent: "center", flexDirection: "row", alignItems: "center" }}
          onPress={() => router.push("/playerSearch")}
        >
          <ThemedText type="subtitle">Search for Players</ThemedText>
          <Icon name="chevron-right" size={32} color={color} style={{paddingTop: 3}} />
        </TouchableOpacity>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="red" style={styles.loader} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.tag}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/clan/[clanId]",
                params: { clanId: item.tag },
              }}
              style={{ width: "100%", marginVertical: 5 }}
            >
              <ClanResult
                imageUrl={item.badgeUrls.large}
                name={item.name}
                tag={item.tag}
                // clanLevel={item.clanLevel}
                warLeague={item.warLeague?.name || "Unknown"}
                members={item.members}
                type={TypeLabels[item.type]}
                leagueIcon={item.warLeague?.name ? LeagueMap[item.warLeague.name] : ""}
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
  container: {
    flex: 1,
    padding: 16,
  },
  loader: {
    marginTop: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    alignSelf: "center",
  },
});

export default ClanSearch;
