import { useQuery } from 'react-query';

import { QUERY_TEAM_INVITATIONS_ALL } from '../../const/query.const';
import { InvitePayload } from '../../types/inviteResponse';
import { useAxios } from '../useAxios';

export type InviteResponse = { data: InvitePayload[] };

export const useTeamInvitationsQuery = () => {
  const axios = useAxios();

  return useQuery<InviteResponse>(QUERY_TEAM_INVITATIONS_ALL, async () => {
    const response = await axios.get('teams/invites');
    return response.data;
  });
};
