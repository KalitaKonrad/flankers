import { useInfiniteQuery, useQuery } from 'react-query';

import {
  QUERY_LEADERBOARDS_TEAM,
  QUERY_USER_GAMES,
} from '../const/query.const';
import { MatchHistoryResponse } from '../types/match';
import { useAxios } from './useAxios';

export const useUserMatchHistoryQuery = (page = 1) => {
  const axios = useAxios();

  return useInfiniteQuery<MatchHistoryResponse>(
    QUERY_USER_GAMES,
    async () => {
      const response = await axios.get(`user/games?page=${page}`);
      return response.data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.next_page_url === null) {
          return false;
        }
        // return allPages.length + 1;
        return lastPage.current_page + 1;
      },
    }
  );
};
