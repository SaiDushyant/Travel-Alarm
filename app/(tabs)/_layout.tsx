import { Tabs } from "expo-router";
import { useTheme } from "../../contexts/ThemeContext";
import { themeColors } from "../../constants/theme";

const TabLayout = () => {
  const { isDark } = useTheme();
  const colors = themeColors[isDark ? "dark" : "light"];

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text + "80",
      }}
    >
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="settings" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default TabLayout;
