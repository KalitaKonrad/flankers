import { useQuery } from 'react-query';

import { QUERY_LEADERBOARDS_TEAM } from '../const/query.const';
import { TeamProfilePayload } from '../types/teamProfile';
import { useAxios } from './useAxios';

export const useTeamLeaderboardsQuery = () => {
  const axios = useAxios();

  return useQuery<TeamProfilePayload[]>(QUERY_LEADERBOARDS_TEAM, async () => {
    const response = await axios.get<{ data: TeamProfilePayload[] }>(
      'leaderboards/team'
    );

    return response.data.data;
  });
};
