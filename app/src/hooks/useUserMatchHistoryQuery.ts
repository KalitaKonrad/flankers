import { useInfiniteQuery, useQuery } from 'react-query';

import {
  QUERY_LEADERBOARDS_TEAM,
  QUERY_USER_GAMES,
} from '../const/query.const';
import { MatchHistoryResponse } from '../types/match';
import { useAxios } from './useAxios';

export const useUserMatchHistoryQuery = (page: number) => {
  const axios = useAxios();

  return useInfiniteQuery<MatchHistoryResponse>(
    QUERY_USER_GAMES,
    async () => {
      const response = await axios.get(`leaderboards/team?page=${page}`);
      return response.data;
    },
    {
      getFetchMore: (lastPage, allPages) => {
        if (lastPage === null) {
          return false;
        }
        return allPages.length + 1;
      },
    }
  );
};
