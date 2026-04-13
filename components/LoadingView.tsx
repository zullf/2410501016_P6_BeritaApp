import { View, ActivityIndicator, Text } from 'react-native';

export const LoadingView = () => (
  <View style={{ alignItems: 'center', marginTop: 20 }}>
    <ActivityIndicator size="large" />
    <Text>Loading...</Text>
  </View>
);