import { useMutation, useQuery, useQueryCache } from 'react-query';

import { QUERY_TEAM_KEY, QUERY_TEAM_MEMBERS } from '../const/query.const';
import { useAxios } from './useAxios';
import { UserProfilePayload } from './useUserProfile';

export interface TeamProfile {
  id: number;
  name: string;
  description: string;
  owner_id: number;
  updated_at: string;
  created_at: string;
}

interface TeamExit {
  team_id: number;
  user_id: number;
}

export type TeamMembersResponse = UserProfilePayload[];

export const useTeamProfileQuery = () => {
  const axios = useAxios();

  return useQuery<TeamProfile>(QUERY_TEAM_KEY, async () => {
    const response = await axios.get<TeamProfile>(QUERY_TEAM_KEY);
    return response.data;
  });
};

export const useShowMembersOfTeamQuery = (
  team_id: number | null | undefined
) => {
  const axios = useAxios();

  return useQuery<TeamMembersResponse>(
    QUERY_TEAM_MEMBERS,
    async () => {
      if (team_id === undefined) {
        return [];
      }
      const response = await axios.get<{ data: TeamMembersResponse }>(
        QUERY_TEAM_MEMBERS + '/' + team_id
      );
      return response.data.data;
    },
    { enabled: !!team_id }
  );
};

export const useTeamExit = () => {
  const axios = useAxios();

  const queryCache = useQueryCache();

  return useMutation(
    ({ team_id, user_id }: { team_id: number; user_id: number }) =>
      axios.delete(QUERY_TEAM_MEMBERS + '/' + team_id, { data: user_id }),
    {
      onSuccess: (user_id) => {
        queryCache.invalidateQueries(QUERY_TEAM_MEMBERS + '/' + user_id);
      },
    }
  );
};
