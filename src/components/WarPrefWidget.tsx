import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from './ui/ThemedText';
import { TownHallMap } from '../constants/HallMaps';


type WarPrefProps = {
    warReady: boolean; //opted in for war
    townhall: number;
    name: string;
    lastActive: string; //last seen in game, from api if possible, else drop
}

const WarPrefWidget = ({warReady, townhall, name, lastActive}: WarPrefProps) => {
  const thImage = TownHallMap[townhall];
  return (
    <View style={[styles.container, {backgroundColor: warReady ? 'springgreen' : 'coral'}]}>
      <Image source={{uri: thImage}} style={styles.image} />
      <View>
      <ThemedText type='subtitle'>{name}</ThemedText>      
      <ThemedText type='default'>{lastActive}</ThemedText>      
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      borderRadius: 7,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginVertical: 2,
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 45,
      height: 45,
      marginRight: 15,
    }
})

export default WarPrefWidget
