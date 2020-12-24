import { Query, useQuery } from 'react-query';

import { QUERY_GAMES } from '../const/query.const';
import { useAxios } from './useAxios';
import { MatchListResponse } from './useMatchListQuery';

interface GameDetailsResponse extends MatchListResponse {
  squads: object[]; //TODO: squad interface
}

export const useGameDetailsQuery = (match_id: number | null | undefined) => {
  const axios = useAxios();

  return useQuery<GameDetailsResponse>(
    QUERY_GAMES,
    async () => {
      const response = await axios.get(`games/${match_id}`);
      return response.data;
    },
    { enabled: !!match_id }
  );
};
