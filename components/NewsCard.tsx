import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Article } from '../services/newsService';
import { useTheme } from '../context/ThemeContext';

export const NewsCard = ({
  article,
  onPress,
}: {
  article: Article;
  onPress: () => void;
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        margin: 10,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: isDark ? '#1f1f1f' : '#fff',
        elevation: 3,
      }}
    >
      {article.urlToImage && (
        <Image
          source={{ uri: article.urlToImage }}
          style={{ height: 180, width: '100%' }}
        />
      )}

      <View style={{ padding: 10 }}>
        <Text
          style={{
            color: isDark ? '#fff' : '#000',
            fontWeight: 'bold',
            fontSize: 14,
            marginBottom: 5,
          }}
        >
          {article.title}
        </Text>

        <Text
          numberOfLines={2}
          style={{
            color: isDark ? '#ccc' : '#555',
            fontSize: 12,
          }}
        >
          {article.description || 'No description'}
        </Text>

        <Text
          style={{
            marginTop: 5,
            fontSize: 10,
            color: isDark ? '#888' : '#999',
          }}
        >
          {article.source?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};