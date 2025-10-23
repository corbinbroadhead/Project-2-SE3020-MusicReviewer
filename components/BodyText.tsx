import { useTheme } from "@/contexts/ThemeContext";
import { Text } from "react-native";

type Props = {
  text: string;
  size?: number;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  textAlign?: string;
};

export default function BodyText({ text, size = 16, marginTop = 3, marginBottom = 1, textAlign = "left" }: Props) {
  const { colors } = useTheme();

  return (
    <Text
      style={{
        fontSize: size,
        marginTop: marginTop,
        marginBottom: marginBottom,
        color: colors.text,
        fontWeight: "normal",
        textAlign: textAlign,
        fontFamily: "LTSaeada-Regular",
        flexWrap: "wrap"
      }}
    >
      {text}
    </Text>
  );
}