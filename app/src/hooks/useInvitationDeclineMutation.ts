import { useMutation, useQueryClient } from 'react-query';

import { QUERY_TEAM_INVITATIONS_ALL } from '../const/query.const';
import { useAxios } from './useAxios';

export const useInvitationDeclineMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

  return useMutation(
    (declineToken: string) =>
      axios.get(`teams/invites/decline/${declineToken}`),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(QUERY_TEAM_INVITATIONS_ALL);
      },
    }
  );
};
