import { useInfiniteQuery } from '@tanstack/react-query';
import { newsService } from '../services/newsService';
import { saveCache, getCache } from '../utils/cache';

export const useNews = (category: string) => {
  return useInfiniteQuery({
    queryKey: ['news', category],

    queryFn: async ({ pageParam = 1 }) => {
      try {
        const data = await newsService.getTopHeadlines(category, pageParam);
        await saveCache(`news-${category}`, data);

        return data;
      } catch (error) {

        const cached = await getCache(`news-${category}`);
        if (cached) return cached;

        throw error;
      }
    },

    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.articles || lastPage.articles.length === 0) {
        return undefined;
      }
      return pages.length + 1;
    },

    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
};