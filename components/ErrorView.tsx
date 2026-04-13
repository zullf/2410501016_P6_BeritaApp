import { View, Text, Button } from 'react-native';

export const ErrorView = ({ message, onRetry }: any) => (
  <View style={{ alignItems: 'center', marginTop: 20 }}>
    <Text>{message}</Text>
    <Button title="Retry" onPress={onRetry} />
  </View>
);