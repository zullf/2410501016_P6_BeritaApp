import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export const BookmarkButton = ({ isSaved, onPress }: any) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        marginTop: 40,
        marginLeft: 15,
        marginBottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: isDark ? "#1f1f1f" : "#fff",
        elevation: 2,
      }}
    >
      <Ionicons
        name={isSaved ? "bookmark" : "bookmark-outline"}
        size={18}
        color={isSaved ? "#0891B2" : isDark ? "#fff" : "#333"}
      />

      <Text
        style={{
          marginLeft: 6,
          fontWeight: "600",
          color: isDark ? "#fff" : "#333",
        }}
      >
        {isSaved ? "Saved" : "Save"}
      </Text>
    </TouchableOpacity>
  );
};