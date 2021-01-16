import { useMutation, useQueryClient } from 'react-query';

import { useAxios } from './useAxios';

interface RemoveTeamMemberPayload {
  team_id: string;
  user_id: number;
}

export const useRemoveTeamMemberMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

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
