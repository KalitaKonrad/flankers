import { useQuery } from 'react-query';

import { QUERY_GAMES } from '../const/query.const';
import { MatchResponse } from '../types/matchResponse';
import { useAxios } from './useAxios';

export const useGameDetailsQuery = (match_id: number | undefined) => {
  const axios = useAxios();

  return useQuery<MatchResponse>(
    `${QUERY_GAMES}/${match_id}`,
    async () => {
      const response = await axios.get(`games/${match_id}`);
      return response.data;
    },
    { enabled: !!match_id }
  );
};
