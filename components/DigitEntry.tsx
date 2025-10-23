import { useTheme } from "@/contexts/ThemeContext";
import { TextInput, View } from "react-native";

type Props = {
  placeholder: string;
  size?: number;
  margin?: number;
  value?: string;
  height?: number;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  editable?: boolean;
};

export default function DigitEntry({
  placeholder,
  size = 16,
  margin = 2,
  value,
  height = 40,
  onChangeText,
  onSubmitEditing,
  editable = true,
}: Props) {
  const { colors } = useTheme();

  const handleChange = (text: string) => {
    // Allow only digits and a single decimal point
    const numericText = text.replace(/[^0-9.]/g, "");
    const parts = numericText.split(".");
    const cleaned =
      parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : numericText;
    onChangeText?.(cleaned);
  };

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.text}
        style={{
          fontSize: size,
          marginVertical: margin,
          padding: 8,
          borderWidth: 0,
          borderColor: colors.text,
          color: colors.text,
          backgroundColor: colors.accent,
          borderRadius: 6,
          width: "90%",
          height: height,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
        value={value}
        onSubmitEditing={onSubmitEditing}
        onChangeText={handleChange}
        editable={editable}
        keyboardType="numeric"
      />
    </View>
  );
}
