import { useMutation, useQueryClient } from 'react-query';

import { QUERY_TEAM_INVITATIONS_ALL } from '../const/query.const';
import { useAxios } from './useAxios';

export const useInvitationAcceptMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

  return useMutation(
    (acceptToken: string) => axios.get(`teams/invites/${acceptToken}`),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(QUERY_TEAM_INVITATIONS_ALL);
      },
    }
  );
};
