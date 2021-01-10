import { useQuery } from 'react-query';

import { QUERY_GAME_INVITATION } from '../const/query.const';
import { MatchResponse } from '../types/matchResponse';
import { useAxios } from './useAxios';

export const useGameInviteQuery = (invite_code: string) => {
  const axios = useAxios();

  return useQuery<MatchResponse>(
    QUERY_GAME_INVITATION,
    async () => {
      const response = await axios.get(`games/invites/${invite_code}`);
      return response.data.data;
    },
    { enabled: !!invite_code }
  );
};
