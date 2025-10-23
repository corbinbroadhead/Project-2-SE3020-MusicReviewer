import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
////
import { useFonts } from "expo-font";
import React from "react";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
////

function ThemedStack() {
  const { theme, colors } = useTheme();

  return (
    <>
      {/* Light theme → dark icons, other themes → light icons */}
      <StatusBar
        style={theme === "light" ? "dark" : "light"}
        backgroundColor={colors.background}
      />

      <Stack screenOptions={{ headerShown: false }}>
        {/* Tabs layout (the main app) */}
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
