/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#ffd000';
const tintColorDark = '#ffd000';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#111',
    tabIconDefault: '#ededed',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#181818',
    tint: tintColorDark,
    icon: '#ededed',
    tabIconDefault: '#ededed',
    tabIconSelected: tintColorDark,
  },
};