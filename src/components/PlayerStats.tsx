import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Player } from "../types/Player";
import { ThemedText } from "./ui/ThemedText";
import IconBadge from "./IconBadge";
import { BuilderBaseTroopIcons, EquipmentIcons, HeroIcons, SiegeIcons, SpellIcons, TroopIcons } from "../constants/IconMaps";
import { percentage } from "../services/utilities";
import { BuilderBaseTroops, BuilderHeroes, HeroEquipment, HomeHeroes, HomeSpells, HomeTroops, SiegeMachines } from "../constants/ItemLists";

type PlayerStatsProps = Pick<Player, "heroes" | "heroEquipment" | "troops" | "spells">;

const PlayerStats = ({ ...props }: PlayerStatsProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  //home hero levels stuff
  const homeHeroes = props.heroes?.filter((hero) => hero.village === "home");
  const heroLevels = homeHeroes.reduce((sum, hero) => sum + hero.level, 0) || 0;
  const heroMaxLevels = homeHeroes.reduce((sum, hero) => sum + hero.maxLevel, 0) || 0;

  const builderHeroes = props.heroes?.filter((hero) => hero.village === "builderBase");
  const builderHeroLevels = builderHeroes.reduce((sum, hero) => sum + hero.level, 0) || 0;
  const builderHeroMaxLevels = builderHeroes.reduce((sum, hero) => sum + hero.maxLevel, 0) || 0;

  //equipment level stuff
  const equipments = props.heroEquipment?.filter((heroEquipment) => heroEquipment.village === "home");
  const equipmentLevels = equipments.reduce((sum, equipment) => sum + equipment.level, 0) || 0;
  const equipmentMaxLevels = equipments.reduce((sum, equipment) => sum + equipment.maxLevel, 0) || 0;

  //home troops level stuff
  const homeTroops = props.troops?.filter((troop) => troop.village === "home" && HomeTroops.includes(troop.name));
  const troopLevels = homeTroops.reduce((sum, troop) => sum + troop.level, 0) || 0;
  const troopMaxLevels = homeTroops.reduce((sum, troop) => sum + troop.maxLevel, 0) || 0;

  //builder troops level stuff
  const builderTroops = props.troops?.filter((troop) => troop.village === "builderBase" && BuilderBaseTroops.includes(troop.name));
  const builderTroopLevels = builderTroops.reduce((sum, troop) => sum + troop.level, 0) || 0;
  const builderTroopMaxLevels = builderTroops.reduce((sum, troop) => sum + troop.maxLevel, 0) || 0;

  //spels level stuff
  const homeSpells = props.spells?.filter((spell) => spell.village === "home" && HomeSpells.includes(spell.name));
  const spellsLevels = homeSpells.reduce((sum, spell) => sum + spell.level, 0) || 0;
  const spellsMaxLevels = homeSpells.reduce((sum, spell) => sum + spell.maxLevel, 0) || 0;

  //siege machines level stuff
  const siegeMachines = props.troops.filter((machine) => SiegeMachines.includes(machine.name));
  const siegeLevels = siegeMachines.reduce((sum, machine) => sum + machine.level, 0) || 0;
  const siegeMaxLevels = siegeMachines.reduce((sum, machine) => sum + machine.maxLevel, 0) || 0;

  return (
    <View>
      {/* heroes */}
      <View style={styles.itemsContainer}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Heroes</ThemedText>
          {heroLevels > 0 && (
            <ThemedText type="defaultSemiBold">
              {heroLevels}/{heroMaxLevels} • {percentage(heroLevels, heroMaxLevels).toPrecision(4)}%
            </ThemedText>
          )}
        </View>
        <FlatList
          data={HomeHeroes}
          keyExtractor={(hero) => hero}
          renderItem={({ item }) => {
            const unlockedHero = homeHeroes.find((hero) => hero.name === item);
            return (
              <IconBadge
                key={item}
                locked={unlockedHero ? false : true}
                level={unlockedHero ? unlockedHero.level : null}
                maxLevel={unlockedHero ? unlockedHero.maxLevel : null}
                icon={HeroIcons[item]}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          numColumns={6}
        />
      </View>

      {/* heroEquipment  */}
      <View style={styles.itemsContainer}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Equipment</ThemedText>
          {equipmentLevels > 0 && (
            <ThemedText type="defaultSemiBold">
              {equipmentLevels}/{equipmentMaxLevels} • {percentage(equipmentLevels, equipmentMaxLevels).toPrecision(4)}%
            </ThemedText>
          )}
        </View>
        <FlatList
          data={HeroEquipment}
          keyExtractor={(equipment) => equipment}
          renderItem={({ item }) => {
            const unlockedEquipment = equipments.find((equipment) => equipment.name === item);
            return (
              <IconBadge
                key={item}
                locked={unlockedEquipment ? false : true}
                level={unlockedEquipment ? unlockedEquipment.level : null}
                maxLevel={unlockedEquipment ? unlockedEquipment.maxLevel : null}
                icon={EquipmentIcons[item]}
                style={{
                  backgroundColor: unlockedEquipment?.maxLevel === 27 ? "#dd28dd" : "#0095ff",
                }}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          numColumns={6}
        />
      </View>

      {/* troops */}
      <View style={styles.itemsContainer}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Troops</ThemedText>
          {troopLevels > 0 && (
            <ThemedText type="defaultSemiBold">
              {troopLevels}/{troopMaxLevels} • {percentage(troopLevels, troopMaxLevels).toPrecision(4)}%
            </ThemedText>
          )}
        </View>
        <FlatList
          data={HomeTroops}
          keyExtractor={(troop) => troop}
          renderItem={({ item }) => {
            const unlockedTroop = homeTroops.find((troop) => troop.name === item);
            return (
              <IconBadge
                key={item}
                locked={unlockedTroop ? false : true}
                level={unlockedTroop ? unlockedTroop.level : null}
                maxLevel={unlockedTroop ? unlockedTroop.maxLevel : null}
                icon={TroopIcons[item]}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          numColumns={6}
        />
      </View>

      {/* spells */}
      <View style={styles.itemsContainer}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Spells</ThemedText>
          {spellsLevels > 0 && (
            <ThemedText type="defaultSemiBold">
              {spellsLevels}/{spellsMaxLevels} • {percentage(spellsLevels, spellsMaxLevels).toPrecision(4)}%
            </ThemedText>
          )}
        </View>
        <FlatList
          data={HomeSpells}
          keyExtractor={(spell) => spell}
          renderItem={({ item }) => {
            const unlockedSpell = homeSpells.find((spell) => spell.name === item);
            return (
              <IconBadge
                key={item}
                locked={unlockedSpell ? false : true}
                level={unlockedSpell ? unlockedSpell.level : null}
                maxLevel={unlockedSpell ? unlockedSpell.maxLevel : null}
                icon={SpellIcons[item]}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          numColumns={6}
        />
      </View>

      {/* siege machines */}
      <View style={styles.itemsContainer}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Siege Machines</ThemedText>
          {siegeLevels > 0 && (
            <ThemedText type="defaultSemiBold">
              {siegeLevels}/{siegeMaxLevels} • {percentage(siegeLevels, siegeMaxLevels).toPrecision(4)}%
            </ThemedText>
          )}
        </View>
        <FlatList
          data={SiegeMachines}
          keyExtractor={(machine) => machine}
          renderItem={({ item }) => {
            const unlockedSiege = siegeMachines.find((machine) => machine.name === item);
            return (
              <IconBadge
                key={item}
                locked={unlockedSiege ? false : true}
                level={unlockedSiege ? unlockedSiege.level : null}
                maxLevel={unlockedSiege ? unlockedSiege.maxLevel : null}
                icon={SiegeIcons[item]}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          numColumns={6}
        />
      </View>

      {/* builder base heroes */}
      <View style={styles.itemsContainer}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Builder Base Heroes</ThemedText>
          {builderHeroLevels > 0 && (
            <ThemedText type="defaultSemiBold">
              {builderHeroLevels}/{builderHeroMaxLevels} • {percentage(builderHeroLevels, builderHeroMaxLevels).toPrecision(4)}%
            </ThemedText>
          )}
        </View>
        <FlatList
          data={BuilderHeroes}
          keyExtractor={(hero) => hero}
          renderItem={({ item }) => {
            const unlockedHero = builderHeroes.find((hero) => hero.name === item);
            return (
              <IconBadge
                key={item}
                locked={unlockedHero ? false : true}
                level={unlockedHero ? unlockedHero.level : null}
                maxLevel={unlockedHero ? unlockedHero.maxLevel : null}
                icon={HeroIcons[item]}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          numColumns={6}
        />
      </View>

      {/* builder base troops */}
      <View style={styles.itemsContainer}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Builder Base Troops</ThemedText>
          {builderTroopLevels > 0 && (
            <ThemedText type="defaultSemiBold">
              {builderTroopLevels}/{builderTroopMaxLevels} • {percentage(builderTroopLevels, builderTroopMaxLevels).toPrecision(4)}%
            </ThemedText>
          )}
        </View>
        <FlatList
          data={BuilderBaseTroops}
          keyExtractor={(troop) => troop}
          renderItem={({ item }) => {
            const unlockedTroop = builderTroops.find((troop) => troop.name === item);
            return (
              <IconBadge
                key={item}
                locked={unlockedTroop ? false : true}
                level={unlockedTroop ? unlockedTroop.level : null}
                maxLevel={unlockedTroop ? unlockedTroop.maxLevel : null}
                icon={BuilderBaseTroopIcons[item]}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          numColumns={6}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
  },
  itemsContainer: {
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#424242",
    alignItems: "center",
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});

export default PlayerStats;
