import StandardButton from "@/components/StandardButton";
import TitleText from "@/components/TitleText";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const THEMES = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  { key: "seasonal", label: "Seasonal" },
] as const;

export default function Settings() {
  const { colors, setTheme } = useTheme();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
          keyboardShouldPersistTaps="handled"
        >
          {/* --- Theme Section --- */}
          <TitleText text="Select a Theme" size={28} marginTop={12} marginBottom={12} />
          <View style={styles.buttonGroup}>
            {THEMES.map((t) => (
              <View key={t.key} style={styles.buttonWrapper}>
                <StandardButton text={t.label} onPress={() => setTheme(t.key)} />
              </View>
            ))}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: "center",
    paddingTop: 60,
  },
  buttonGroup: {
    width: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  buttonWrapper: {
    width: "90%",
    marginVertical: 6,
  },
});
