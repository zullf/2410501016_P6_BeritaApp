import { useLocalSearchParams } from "expo-router";
import DetailScreen from "../../screens/DetailScreen";

export default function Page() {
  const { url, article } = useLocalSearchParams();

  return (
    <DetailScreen
      route={{
        params: {
          url,
          article: article ? JSON.parse(article as string) : null,
        },
      }}
    />
  );
}
