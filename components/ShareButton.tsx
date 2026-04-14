import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system/legacy";

export const ShareButton = ({ url }: any) => {
  const onShare = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + "article.txt";
      const content = `Baca berita ini:\n${url}`;
      await FileSystem.writeAsStringAsync(fileUri, content);
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={onShare}
      style={{
        position: "absolute",
        top: 110,
        right: 15,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 50,
        elevation: 5,
      }}
    >
      <Ionicons name="share-social-outline" size={22} color="#333" />
    </TouchableOpacity>
  );
};