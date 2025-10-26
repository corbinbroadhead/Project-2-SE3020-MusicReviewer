import { useFonts } from "expo-font";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import 'react-native-reanimated';
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";

function ThemedStack() {
  const { theme, colors } = useTheme();

  return (
    <>
      <StatusBar
        style={theme === "light" ? "dark" : "light"}
        backgroundColor={colors.background}
      />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("@/assets/fonts/LTSaeada-Bold.otf"),
    "Roboto-Regular": require("@/assets/fonts/LTSaeada-Regular.otf"),
  });

  if (!fontsLoaded) return null;
  return (
    <ThemeProvider>
      <ThemedStack />
    </ThemeProvider>
  );
}
