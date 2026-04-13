import Constants from 'expo-constants';

export const config = {
  apiKey: Constants.expoConfig?.extra?.newsApiKey as string,
  baseUrl: Constants.expoConfig?.extra?.newsApiBaseUrl as string,
};