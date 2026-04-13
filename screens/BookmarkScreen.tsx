import { View, FlatList, Text } from "react-native";
import { useBookmarks } from "../hooks/useBookmarks";
import { NewsCard } from "../components/NewsCard";
import { useTheme } from "../context/ThemeContext";

export default function BookmarkScreen({ navigation }: any) {
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

      <FlatList
        data={bookmarks}
        keyExtractor={(item: any, index) => item?.url || index.toString()}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            onPress={() =>
              navigation.navigate("Detail", {
                url: item.url,
                article: item,
              })
            }
          />
        )}
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