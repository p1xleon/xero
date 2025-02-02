import { StyleSheet } from "react-native";
import SearchBar from "../../components/ui/SearchBar";
import { ThemedView } from "../../components/ui/ThemedView";
import Header from "../../components/ui/Header";
import Events from "../events";

export default function Home() {
  return (
    <ThemedView style={styles.container}>
      <Header title="xero" />
      <SearchBar type="player" />
      <Events />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
});
