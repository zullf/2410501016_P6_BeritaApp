import 'dotenv/config';

export default {
  expo: {
    plugins: ["expo-sharing"], 
    extra: {
      newsApiKey: process.env.NEWS_API_KEY,
      newsApiBaseUrl: process.env.NEWS_API_BASE_URL,
    },
  },
};