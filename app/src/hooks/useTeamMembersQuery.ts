import { useQuery } from 'react-query';

import { QUERY_TEAM_MEMBERS } from '../const/query.const';
import { useAxios } from './useAxios';
import { TeamMembersResponse } from './useTeamManageQuery';

export const useTeamMembersQuery = (team_id: number | null | undefined) => {
  const axios = useAxios();

  return useQuery<TeamMembersResponse>(
    QUERY_TEAM_MEMBERS,
    async () => {
      const response = await axios.get<{ data: TeamMembersResponse }>(
        `teams/memberships/${team_id}`
      );
      return response.data.data;
    },
    { enabled: !!team_id }
  );
};
