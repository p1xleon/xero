import { KeyboardTypeOptions, ReturnKeyTypeOptions, StyleSheet, TextInput, useColorScheme, View } from "react-native";
import React from "react";
import { useThemeColor } from "../../hooks/useThemeColor";

type InputProps = {
  value?: string;
  label?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  autofocus?: boolean;
  onSubmitEditing?: () => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: "characters";
};

const ThemedInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  returnKeyType,
  autofocus,
  onSubmitEditing,
  keyboardType,
  secureTextEntry,
  autoCapitalize,
}: InputProps) => {
  const color = useThemeColor({ light: "#000", dark: "#fff" }, "background");
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        style={[styles.input, {color: color}]}
        onChangeText={onChangeText}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        autoFocus={autofocus}
        onSubmitEditing={onSubmitEditing}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        placeholderTextColor={'#797979'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 225,
    padding: 14,
    borderColor: "#979797",
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default ThemedInput;
