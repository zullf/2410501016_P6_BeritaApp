import {
  View,
  TextInput,
  FlatList,
  Text,
} from "react-native";
import { useState, useEffect } from "react";
import { useNewsSearch } from "../hooks/useNewsSearch";
import { NewsCard } from "../components/NewsCard";
import { useTheme } from "../context/ThemeContext";

export default function SearchScreen({ navigation }: any) {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [source, setSource] = useState("");

  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(text);
    }, 500);

    return () => clearTimeout(handler);
  }, [text]);

  const { data, isLoading } = useNewsSearch(
    query,
    from,
    to,
    source
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        marginTop: 40,
        backgroundColor: isDark ? "#111" : "#F9FAFB",
      }}
    >
      <TextInput
        placeholder="Cari berita..."
        placeholderTextColor={isDark ? "#888" : "#999"}
        value={text}
        onChangeText={setText}
        style={{
          backgroundColor: isDark ? "#1f1f1f" : "#fff",
          padding: 12,
          borderRadius: 12,
          marginBottom: 15,
          color: isDark ? "#fff" : "#000",
          elevation: 2,
        }}
      />
      <View
        style={{
          backgroundColor: isDark ? "#1f1f1f" : "#fff",
          padding: 12,
          borderRadius: 12,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            marginBottom: 8,
            fontWeight: "bold",
            color: isDark ? "#fff" : "#000",
          }}
        >
          Filter
        </Text>

        <TextInput
          placeholder="From (2024-01-01)"
          placeholderTextColor={isDark ? "#888" : "#999"}
          value={from}
          onChangeText={setFrom}
          style={{
            borderWidth: 1,
            borderColor: isDark ? "#333" : "#ddd",
            padding: 8,
            marginBottom: 8,
            borderRadius: 8,
            color: isDark ? "#fff" : "#000",
          }}
        />

        <TextInput
          placeholder="To (2024-12-31)"
          placeholderTextColor={isDark ? "#888" : "#999"}
          value={to}
          onChangeText={setTo}
          style={{
            borderWidth: 1,
            borderColor: isDark ? "#333" : "#ddd",
            padding: 8,
            marginBottom: 8,
            borderRadius: 8,
            color: isDark ? "#fff" : "#000",
          }}
        />

        <TextInput
          placeholder="Source (bbc-news)"
          placeholderTextColor={isDark ? "#888" : "#999"}
          value={source}
          onChangeText={setSource}
          style={{
            borderWidth: 1,
            borderColor: isDark ? "#333" : "#ddd",
            padding: 8,
            borderRadius: 8,
            color: isDark ? "#fff" : "#000",
          }}
        />
      </View>

      {isLoading ? (
        <Text style={{ color: isDark ? "#fff" : "#000" }}>
          Loading...
        </Text>
      ) : (
        <FlatList
          data={data?.articles || []}
          keyExtractor={(item: any) => item.url}
          showsVerticalScrollIndicator={false}
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
        />
      )}
    </View>
  );
}