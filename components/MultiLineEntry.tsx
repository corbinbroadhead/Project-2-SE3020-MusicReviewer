
import { useTheme } from "@/contexts/ThemeContext";
import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native";

type Props = {
  placeholder: string;
  size?: number;
  margin?: number;
  height?: number;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  editable?: boolean;
};

export default function MultiLineEntry({
  placeholder,
  size = 14,
  margin = 2,
  height = 120,
  value,
  onChangeText,
  onSubmitEditing,
  editable = true,
}: Props) {
  const { colors } = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.wrapper}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.text}
          multiline
          style={{
            fontSize: size,
            marginVertical: margin,
            padding: 10,
            borderWidth: 0,
            borderColor: colors.text,
            color: colors.text,
            backgroundColor: colors.accent,
            borderRadius: 6,
            textAlignVertical: "top",
            height,
            width: "90%",
            alignSelf: "center",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          }}
          value={value}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          editable={editable}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
});
