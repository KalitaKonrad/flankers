import { useMutation, useQueryCache } from 'react-query';

import { QUERY_TEAM_INVITATION } from '../const/query.const';
import { useAxios } from './useAxios';

interface TeamsInvitationPayload {
  email: string;
}

export const useTeamInvitationMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryCache();

  return useMutation(
    (email: TeamsInvitationPayload) =>
      axios.post('teams/invites', {
        email,
      }),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(QUERY_TEAM_INVITATION);
        console.log('JEST  W PYTE');
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
};
