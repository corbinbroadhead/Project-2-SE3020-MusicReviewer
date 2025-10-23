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

export default function TitleText({ text, size = 20, margin = 2, marginTop = 0, marginBottom = 0, textAlign = "left" }: Props) {
  const { colors } = useTheme();

  return (
    <Text
      style={{
        fontSize: size,
        color: colors.text,
        fontWeight: "bold",
        textAlign: textAlign,
        width: "100%",
        fontFamily: "LTSaeada-Bold",
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginVertical: margin,
        flexWrap: "wrap"
      }}
    >
      {text}
    </Text>
  );
}