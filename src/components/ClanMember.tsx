import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedText } from "./ui/ThemedText";

type MemberProps = {
  name: string;
  role: string;
  trophies: number;
  thIcon: string;
  // leagueIcon: string;
  expLevel: number;
  // clanRank: number;
};

const ClanMember = ({
  name,
  role,
  trophies,
  thIcon,
  // leagueIcon,
  expLevel,
}: // clanRank,
MemberProps) => {
  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <View style={styles.badge}>
          {/* <ThemedText type="defaultSemiBold">{clanRank}</ThemedText> */}
          {/* th icon */}
          <Image
            source={{
              uri: thIcon,
            }}
            style={styles.townhallIcon}
          />

          {/* name, title and exp */}
          <View>
            <ThemedText type="defaultSemiBold">{name}</ThemedText>
            <View style={styles.badge}>
              <ThemedText type="subtext">{role}</ThemedText>
              <View style={styles.badge}>
                <ThemedText> • </ThemedText>
                <Image
                  source={{
                    uri: "https://static.wikia.nocookie.net/clashofclans/images/1/1a/XP.png",
                  }}
                  style={styles.expIcon}
                />
                <ThemedText type="subtext">{expLevel}</ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* trophy */}
        <View style={styles.badge}>
          {/* <Image
            source={{
              uri: leagueIcon,
            }}
            style={styles.leagueIcon}
          /> */}
          <Image
            source={{
              uri: "https://static.wikia.nocookie.net/clashofclans/images/c/cd/Trophy.png/revision/latest?cb=20171031024226",
            }}
            style={styles.leagueIcon}
          />
          <ThemedText type="defaultSemiBold">{trophies}</ThemedText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#414141",
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "space-between",
  },
  townhallIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
    marginLeft: 10,
  },
  expIcon: {
    width: 12,
    height: 12,
    marginRight: 3,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
  },
  leagueIcon: {
    width: 15,
    height: 15,
    marginEnd: 5,
    justifyContent: "flex-start",
  },
});

export default ClanMember;
