import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveCache = async (key: string, data: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

export const getCache = async (key: string) => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};