import { useQuery } from '@tanstack/react-query';
import { newsService } from '../services/newsService';

export const useNewsSearch = (
  query: string,
  from?: string,
  to?: string,
  source?: string
) => {
  return useQuery({
    queryKey: ['search', query, from, to, source],
    queryFn: () =>
      newsService.searchArticles(query, 1, from, to, source),
    enabled: !!query,
  });
};