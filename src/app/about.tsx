import { Linking, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ThemedView } from "../components/ui/ThemedView";
import { ThemedText } from "../components/ui/ThemedText";
import { router } from "expo-router";

const About = () => {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <Icon name="cheese" size={24} style={styles.icon} />
        <View>
          <ThemedText style={styles.superThemedText}>Version</ThemedText>
          <ThemedText style={styles.subThemedText}>1.0</ThemedText>
        </View>
      </View>

      <TouchableOpacity style={styles.card} onPress={() => router.push("/changelog")}>
        <Icon name="code-tags" size={24} style={styles.icon} />
        <View>
          <ThemedText style={styles.superThemedText}>Changelog</ThemedText>
          <ThemedText style={styles.subThemedText}>- Bugs + Features</ThemedText>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => Linking.openURL("https://github.com/p1xleon/xero")}
        style={styles.card}>
        <Icon name="github" size={24} style={styles.icon} />
        <View>
          <ThemedText style={styles.superThemedText}>Githib Repo</ThemedText>
          <ThemedText style={styles.subThemedText}>View Source Code</ThemedText>
        </View>
      </TouchableOpacity>

      <View style={styles.acknowledgements}>
        <View style={styles.card}>
          <Icon name="file-document" size={24} style={styles.icon} />
          <View>
            <ThemedText style={styles.superThemedText}>Third Party Notices</ThemedText>
          </View>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => Linking.openURL("https://api.clashk.ing/docs#/")}>
            <Image
              source={{ uri: "https://avatars.githubusercontent.com/u/163577176?s=200&v=4" }}
              style={styles.image}
            />
            <View>
              <ThemedText style={styles.superThemedText}>Clash King API</ThemedText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => Linking.openURL("https://developer.clashofclans.com/#/")}>
            <Image
              source={{
                uri: "https://static.wikia.nocookie.net/logopedia/images/c/cc/Clash_of_Clans_%28App_Icon%29.png/revision/latest/scale-to-width-down/1000?cb=20220625115343",
              }}
              style={styles.image}
            />
            <View>
              <ThemedText style={styles.superThemedText}>Clash of Clans API</ThemedText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: "flex-end", alignItems: 'center', marginBottom: 20}}>
        <ThemedText type="defaultSemiBold" style={{textAlign: 'center'}}>
          This material is unofficial and is not endorsed by Supercell. For more information see
          Supercell's Fan Content Policy:
        </ThemedText>
        <ThemedText type="link" onPress={() => Linking.openURL("https://supercell.com/en/fan-content-policy/")}>
          https://supercell.com/en/fan-content-policy/
        </ThemedText>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    padding: 10,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  superThemedText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subThemedText: {
    fontSize: 16,
  },
  licenseThemedText: {
    marginHorizontal: 20,
    fontSize: 16,
    marginVertical: 5,
  },
  icon: {
    marginEnd: 20,
    color: "#f1f1f1",
  },
  acknowledgements: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#353535",
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#353535",
  },
});

export default About;
