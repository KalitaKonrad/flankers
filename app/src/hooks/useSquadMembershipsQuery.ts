import { useQuery } from 'react-query';

import { QUERY_GAME_SQUAD } from '../const/query.const';
import { SquadMembershipsResponse } from '../types/squadMembershipsResponse';
import { useAxios } from './useAxios';

export const useSquadMembershipsQuery = (squadId: number) => {
  const axios = useAxios();

  return useQuery<SquadMembershipsResponse>(QUERY_GAME_SQUAD, async () => {
    const response = await axios.get(`games/memberships/${squadId}`);

    return response.data;
  });
};
