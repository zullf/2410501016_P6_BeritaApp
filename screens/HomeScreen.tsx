import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useNews } from "../hooks/useNews";
import { NewsCard } from "../components/NewsCard";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { ShareButton } from "../components/ShareButton";

const categories = ["technology", "sports", "business", "health"];

export default function HomeScreen({ navigation }: any) {
  const [category, setCategory] = useState("technology");
  const { theme, toggleTheme } = useTheme();
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useNews(category);

  const articles =
    data?.pages?.flatMap((p: any) => p?.articles || []) ?? [];

  const isDark = theme === "dark";

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView message="Error" onRetry={refetch} />;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#111" : "#F9FAFB",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
          backgroundColor: isDark ? "#1f1f1f" : "#fff",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: isDark ? "#fff" : "#000",
            marginTop: 40,
          }}
        >
          Berita App
        </Text>

        <View style={{ flexDirection: "row", gap: 15, marginTop: 40, }}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Ionicons name="search" size={20} color={isDark ? "#fff" : "#000"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Bookmark")}>
            <Ionicons name="bookmark" size={20} color={isDark ? "#fff" : "#000"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleTheme}>
            <Ionicons
              name={isDark ? "sunny" : "moon"}
              size={20}
              color={isDark ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 10,
        }}
      >
        {categories.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setCategory(c)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 20,
              backgroundColor:
                category === c
                  ? "#0891B2"
                  : isDark
                  ? "#333"
                  : "#E5E7EB",
            }}
          >
            <Text
              style={{
                color: category === c ? "#fff" : isDark ? "#fff" : "#333",
                textTransform: "capitalize",
              }}
            >
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <FlatList
        data={articles}
        keyExtractor={(item, index) => item.url || index.toString()}
        renderItem={({ item }) => (
          <View>
            <NewsCard
              article={item}
              onPress={() =>
                navigation.navigate("Detail", {
                  url: item.url,
                  article: item,
                })
              }
            />
           <ShareButton url={item.url} />
          </View>
        )}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </View>
  );
}