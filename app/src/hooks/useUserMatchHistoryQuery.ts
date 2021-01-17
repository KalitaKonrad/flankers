import { useInfiniteQuery } from 'react-query';

import { QUERY_USER_GAMES } from '../const/query.const';
import { MatchHistoryResponse } from '../types/match';
import { useAxios } from './useAxios';

export const useUserMatchHistoryQuery = ({ page = 1 }) => {
  const axios = useAxios();

  return useInfiniteQuery<MatchHistoryResponse>(
    QUERY_USER_GAMES,
    async ({ pageParam = page }) => {
      const response = await axios.get<MatchHistoryResponse>(
        `user/games?page=${pageParam}`
      );
      return response.data;
    },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => {
        return lastPage.next_page_url ? lastPage.current_page + 1 : false;
      },
    }
  );
};
