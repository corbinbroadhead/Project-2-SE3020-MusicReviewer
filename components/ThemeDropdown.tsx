import { useTheme } from "@/contexts/ThemeContext";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";

interface DropdownItem {
  value: string;
  label: string;
  image?: string;
}

interface ThemeDropdownProps {
  data: DropdownItem[];
  initialValue?: string;
  onChange?: (value: string) => void;
}

const ThemeDropdown: React.FC<ThemeDropdownProps> = ({
  data,
  initialValue,
  onChange,
}) => {
  const [field, setField] = useState(initialValue || data[0]?.value || "");
  const { colors } = useTheme();

  return (
    <SelectCountry
      style={[styles.dropdown, { backgroundColor: colors.accent, width: "90%" }]}
      selectedTextStyle={[styles.selectedTextStyle, { color: colors.text }]}
      placeholderStyle={[styles.placeholderStyle, { color: colors.text }]}
      iconStyle={[styles.iconStyle, { tintColor: colors.text }]}
      imageStyle={styles.imageStyle}
      containerStyle={{ backgroundColor: colors.accent }}
      itemTextStyle={{ color: colors.text }}
      activeColor={colors.tabBarActive}
      maxHeight={200}
      value={field}
      data={data}
      valueField="value"
      labelField="label"
      imageField="image"
      placeholder="Select..."
      searchPlaceholder="Search..."
      onChange={(item) => {
        setField(item.value);
        onChange?.(item.value);
      }}
    />
  );
};

export default ThemeDropdown;

const styles = StyleSheet.create({
  dropdown: {
    marginLeft: 18,
    height: 50,
    maxWidth: 400,
    width: "100%",
    borderRadius: 22,
    paddingHorizontal: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});