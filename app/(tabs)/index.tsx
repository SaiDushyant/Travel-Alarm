import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { themeColors } from "../../constants/theme";
import LocationMap from "@/components/LoactionMap";

export default function Index() {
  const { isDark } = useTheme();
  const colors = themeColors[isDark ? "dark" : "light"];

  return (
    <View
      style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}
    >
      <LocationMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
