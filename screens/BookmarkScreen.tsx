import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { NewsCard } from "../components/NewsCard";
import { useTheme } from "../context/ThemeContext";
import { useBookmarks } from "../hooks/useBookmarks";

export default function BookmarkScreen() {
  const { bookmarks } = useBookmarks();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#111" : "#F9FAFB",
      }}
    >
      {/* TITLE */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          margin: 15,
          color: isDark ? "#fff" : "#000",
          marginTop: 40,
        }}
      >
        Bookmark
      </Text>

      {/* LIST */}
      <FlatList
        data={bookmarks}
        keyExtractor={(item: any, index) => item?.url || index.toString()}
        renderItem={({ item }) => {
          if (!item) return null; // 🛡️ prevent crash

          return (
            <NewsCard
              article={item}
              onPress={() =>
                router.push({
                  pathname: "/detail",
                  params: {
                    url: item.url,
                    article: JSON.stringify(item),
                  },
                })
              }
            />
          );
        }}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text
              style={{
                color: isDark ? "#ccc" : "#555",
                fontSize: 14,
              }}
            >
              Belum ada bookmark
            </Text>
          </View>
        }
      />
    </View>
  );
}
