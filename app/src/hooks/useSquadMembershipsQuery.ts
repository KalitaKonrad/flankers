import { useQuery } from 'react-query';

import { QUERY_GAME_SQUAD, QUERY_GAMES_MEMOS } from '../const/query.const';
import { GameScoreResponse } from '../types/gameScoreResponse';
import { SquadMembershipsResponse } from '../types/squadMembershipsResponse';
import { useAxios } from './useAxios';

export const useSquadMembershipsQuery = (squadId: number) => {
  const axios = useAxios();

  return useQuery<SquadMembershipsResponse>(QUERY_GAME_SQUAD, async () => {
    const response = await axios.get(`games/memberships/${squadId}`);

    return response.data;
  });
};
