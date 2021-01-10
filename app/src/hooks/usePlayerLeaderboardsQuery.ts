import { useQuery } from 'react-query';

import { QUERY_LEADERBOARDS_PLAYER } from '../const/query.const';
import { UserProfilePayload } from '../types/userProfilePayload';
import { useAxios } from './useAxios';

export const usePlayerLeaderboardsQuery = (page: number) => {
  const axios = useAxios();

  return useQuery<UserProfilePayload[]>(QUERY_LEADERBOARDS_PLAYER, async () => {
    const response = await axios.get<{ data: UserProfilePayload[] }>(
      `leaderboards/player?page=${page}`
    );

    return response.data.data;
  });
};
