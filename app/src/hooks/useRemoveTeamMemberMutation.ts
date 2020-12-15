import { useMutation, useQueryCache } from 'react-query';

import { QUERY_TEAM_MEMBERS } from '../const/query.const';
import { useAxios } from './useAxios';

interface RemoveTeamMemberPayload {
  team_id: number;
  user_id: number;
}

export const useRemoveTeamMemberMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryCache();

  return useMutation(
    ({ team_id, user_id }: RemoveTeamMemberPayload) =>
      axios.delete(`teams/memberships/${team_id}`, { data: user_id }),
    {
      onSuccess: (team_id) => {
        queryCache.invalidateQueries(`teams/memberships/${team_id}`);
      },
    }
  );
};
