import { useQuery } from 'react-query';

import { QUERY_LEADERBOARDS_TEAM } from '../const/query.const';
import { LeaderboardsResponse } from '../types/leaderboardsResponse';
import { TeamProfilePayload } from '../types/teamProfile';
import { useAxios } from './useAxios';

// export const useTeamLeaderboardsQuery = (page: number) => {
//   const axios = useAxios();
//
//   return useQuery<TeamProfilePayload[]>(QUERY_LEADERBOARDS_TEAM, async () => {
//     const response = await axios.get<{ data: TeamProfilePayload[] }>(
//       `leaderboards/team?page=${page}`
//     );
//
//     return response.data.data;
//   });
// };

export const useTeamLeaderboardsQuery = (page: number) => {
  const axios = useAxios();

  return useQuery<LeaderboardsResponse<TeamProfilePayload>>(
    [QUERY_LEADERBOARDS_TEAM, page],
    async () => {
      const response = await axios.get(`leaderboards/team?page=${page}`);
      return response.data;
    },
    {
      keepPreviousData: true,
    }
  );
};
