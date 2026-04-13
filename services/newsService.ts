import api from './api';
import { config } from '../config/config';

export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
}

export const newsService = {
  getTopHeadlines: async (category = 'general', page = 1) => {
    const { data } = await api.get('/top-headlines', {
      params: {
        apiKey: config.apiKey,
        country: 'us', 
        category,
        page,
        pageSize: 10,
      },
    });

    console.log("API RESPONSE:", data); 

    return {
      articles: data.articles || [],
      totalResults: data.totalResults || 0,
    };
  },

  searchArticles: async (query: string, page = 1, from?: string, to?: string, source?: string) => {
    const { data } = await api.get('/everything', {
      params: {
        apiKey: config.apiKey,
        q: query,
        from,
        to,
        soruces: source,
        language: 'en',
        page,
        pageSize: 10,
      },
    });

    return {
      articles: data.articles || [],
      totalResults: data.totalResults || 0,
    };
  },

  getSources: async (category?: string) => {
    const { data } = await api.get('/top-headlines/sources', {
      params: {
        apiKey: config.apiKey,
        category,
      },
    });
    return data.sources;
  },
};