import { useQuery } from 'react-query';

import { QUERY_LEADERBOARDS_PLAYER } from '../const/query.const';
import { LeaderboardsResponse } from '../types/leaderboardsResponse';
import { UserProfilePayload } from '../types/userProfilePayload';
import { useAxios } from './useAxios';

export const usePlayerLeaderboardsQuery = (page: number) => {
  const axios = useAxios();

  return useQuery<LeaderboardsResponse<UserProfilePayload>>(
    [QUERY_LEADERBOARDS_PLAYER, page],
    async () => {
      const response = await axios.get(`leaderboards/player?page=${page}`);

      return response.data;
    },
    { keepPreviousData: true }
  );
};
