import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { useBookmarks } from "../hooks/useBookmarks";
import { BookmarkButton } from "../components/BookmarkButton";
import { useTheme } from "../context/ThemeContext";

export default function DetailScreen({ route }: any) {
  const url = route?.params?.url;
  const article = route?.params?.article;

  const { bookmarks, add, remove } = useBookmarks();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!url) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDark ? "#111" : "#fff",
        }}
      >
        <Text style={{ color: isDark ? "#fff" : "#000" }}>
          Data tidak ditemukan
        </Text>
      </View>
    );
  }

  const isSaved = bookmarks.some((b) => b && b.url === url);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#111" : "#fff",
      }}
    >
      <BookmarkButton
        isSaved={isSaved}
        onPress={() => {
          if (isSaved) {
            remove(url);
          } else {
            add(article);
          }
        }}
      />
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
      />
    </View>
  );
}