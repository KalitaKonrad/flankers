import { useMutation, useQueryClient } from 'react-query';

import {
  QUERY_PROFILE_KEY,
  QUERY_TEAM_INVITATIONS_ALL,
  QUERY_TEAM_KEY,
} from '../../const/query.const';
import { useAxios } from '../useAxios';

export const useInvitationAcceptMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

  return useMutation(
    (acceptToken: string) => axios.get(`teams/invites/${acceptToken}`),
    {
      onSuccess: async () => {
        const invitations = queryCache.invalidateQueries(
          QUERY_TEAM_INVITATIONS_ALL
        );
        const team = queryCache.invalidateQueries(QUERY_TEAM_KEY);
        const profile = queryCache.invalidateQueries(QUERY_PROFILE_KEY);
        const refetch = queryCache.refetchQueries(
          [QUERY_TEAM_INVITATIONS_ALL, QUERY_PROFILE_KEY, QUERY_TEAM_KEY],
          { exact: true }
        );

        await Promise.all([invitations, team, profile]);
        await refetch;
      },
    }
  );
};
