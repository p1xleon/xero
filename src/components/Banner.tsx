import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { ThemedText } from "./ui/ThemedText";

type BannerProps = {
    name: string;
    tag: string;
    imageUrl: string;
    last_online?: string;
}

const Banner = ({ name, tag, imageUrl, last_online }: BannerProps) => {
  return (
    <View>
      <View style={styles.banner}>
        <Image
          source={{
            uri: imageUrl
          }}
          style={styles.clanBadge}
        />
        <View>
          <ThemedText type="subtitle">{name}</ThemedText>
          <ThemedText type="secondarySemiBold">{tag}</ThemedText>
          {/* {last_online && (
            <ThemedText type="secondarySemiBold">Last seen {last_online}</ThemedText>
          )} */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    borderColor: '#5f5f5f',
  },
  clanBadge: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});

export default Banner;
