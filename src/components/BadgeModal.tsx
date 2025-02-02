import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";

type ModalProps = {
  name: string;
  level: number;
  maxLevel: number;
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const BadgeModal = ({ name, level, maxLevel, visible, onClose, children }: ModalProps) => {
  return (
    <View>
      <Modal animationType="slide" visible={visible}>
        <View>
          <Text>{name}</Text>
          <Text>{level}</Text>
          <Text>{maxLevel}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BadgeModal;
