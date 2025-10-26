import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

type Props = {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
};

export default function StandardButton({
  text,
  onPress,
  backgroundColor,
  textColor,
  style,
}: Props) {
  const { colors } = useTheme();
  const bgColor = backgroundColor ?? colors.accent;
  const txtColor = textColor ?? colors.text;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: bgColor, opacity: pressed ? 0.8 : 1 },
        style,
      ]}
    >
      <Text style={[styles.text, { color: txtColor }]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "LTSaeada-Bold"
  },
});
