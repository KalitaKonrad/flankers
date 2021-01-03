import { useMutation, useQueryCache } from 'react-query';

import { QUERY_TEAM_INVITATION } from '../const/query.const';
import { useAxios } from './useAxios';

interface TeamsInvitationPayload {
  email: string;
  team_id: number;
}

export const useTeamInvitationMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryCache();

  return useMutation(
    ({ email, team_id }: TeamsInvitationPayload) =>
      axios.post('teams/invites', {
        email,
        team_id,
      }),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(QUERY_TEAM_INVITATION);
      },
      onError: (error) => {
        alert(error);
      },
    }
  );
};
