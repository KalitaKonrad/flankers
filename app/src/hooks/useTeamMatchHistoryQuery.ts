import { useInfiniteQuery } from 'react-query';

import { MatchHistoryResponse } from '../types/match';
import { useAxios } from './useAxios';

export const useTeamMatchHistoryQuery = (
  { page = 1 },
  team_id: number | undefined
) => {
  const axios = useAxios();

  return useInfiniteQuery<MatchHistoryResponse>(
    `QUERY_TEAM_GAMES/${team_id}`,
    async ({ pageParam = page }) => {
      const response = await axios.get<MatchHistoryResponse>(
        `teams/games/${team_id}?page=${pageParam}`
      );
      return response.data;
    },
    {
      keepPreviousData: true,
      enabled: !!team_id,
      getNextPageParam: (lastPage) => {
        return lastPage.next_page_url ? lastPage.current_page + 1 : false;
      },
    }
  );
};
