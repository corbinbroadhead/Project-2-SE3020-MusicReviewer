import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTheme } from "../../contexts/ThemeContext";

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: colors.accent,
          borderTopColor: "transparent",
          paddingHorizontal: 20,
          paddingTop: 8,
          height: 80,
          shadowOpacity: 0.7,
          shadowRadius: 7,
          shadowOffset: { width: 0, height: 3 },
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          switch (route.name) {
            case "create":
              iconName = "add";
              break;
            case "rankings":
              iconName = "trophy";
              break;
            case "recent":
              iconName = "home";
              break;
            case "profile":
              iconName = "person";
              break;
            case "settings-tab":
              iconName = "settings";
              break;
            default:
              iconName = "ellipse-outline";
              break;
          }

          return <Ionicons name={iconName} size={26} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="create" />
      <Tabs.Screen name="rankings" />
      <Tabs.Screen name="recent" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="settings-tab" />
    </Tabs>
  );
}