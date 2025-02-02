import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '../../hooks/useThemeColor';
import React from 'react';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'subtext' | 'subtextBold' | "secondarySemiBold";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'subtext' ? styles.subtext: undefined,
        type === 'subtextBold' ? styles.subtextBold: undefined,
        type === 'secondarySemiBold' ? styles.secondarySemiBold: undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  subtext: {
    fontSize: 14,
    color: '#7c7c7c',
  },
  subtextBold: {
    fontSize: 14,
    color: '#7c7c7c',
    fontWeight: 'bold',
  },
  secondarySemiBold: {
    fontSize: 16,
    color: '#7c7c7c',
    fontWeight: '600',
  }
});