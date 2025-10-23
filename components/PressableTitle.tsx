import { useTheme } from "@/contexts/ThemeContext";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  text: string;
  size?: number;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  textAlign?: "left" | "center" | "right";
  icon?: React.ReactNode;
  onPress: () => void;
};

export default function PressableTitle({
  text,
  size = 20,
  margin = 2,
  marginTop = 0,
  marginBottom = 0,
  textAlign = "left",
  icon,
  onPress,
}: Props) {
  const { colors } = useTheme();

  const defaultIcon = (
    <FontAwesome name="chevron-left" size={size * 0.9} color={colors.text} />
  );

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginTop,
        marginBottom,
        marginVertical: margin,
      }}
    >
      <View style={{ marginRight: 6 }}>{icon || defaultIcon}</View>
      <Text
        style={{
          fontSize: size,
          color: colors.text,
          fontWeight: "bold",
          textAlign,
          fontFamily: "LTSaeada-Bold",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
