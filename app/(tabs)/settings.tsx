import { StyleSheet, View, Switch, Text } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { themeColors } from "../../constants/theme";

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();
  const colors = themeColors[isDark ? "dark" : "light"];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
        <Text style={{ color: colors.text }}>Dark Mode</Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={isDark ? "#ffffff" : "#000000"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
});

export default Settings;
