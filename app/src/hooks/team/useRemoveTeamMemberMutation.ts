import { useMutation, useQueryClient } from 'react-query';

import {
  QUERY_PROFILE_KEY,
  QUERY_TEAM_KEY,
  QUERY_TEAM_MEMBERS,
} from '../../const/query.const';
import { useAxios } from '../useAxios';

interface RemoveTeamMemberPayload {
  team_id: string;
  user_id: number;
}

export const useRemoveTeamMemberMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

  return useMutation(
    ({ team_id, user_id }: RemoveTeamMemberPayload) => {
      return axios.delete(`teams/memberships/${team_id}`, {
        data: { user_id },
      });
    },
    {
      onSuccess: async () => {
        const members = queryCache.invalidateQueries(QUERY_TEAM_MEMBERS);
        const team = queryCache.invalidateQueries(QUERY_TEAM_KEY);
        const profile = queryCache.invalidateQueries(QUERY_PROFILE_KEY);
        const refetch = queryCache.refetchQueries(
          [QUERY_TEAM_MEMBERS, QUERY_PROFILE_KEY, QUERY_TEAM_KEY],
          { exact: true }
        );

        await Promise.all([members, team, profile]);
        await refetch;
      },
    }
  );
};
