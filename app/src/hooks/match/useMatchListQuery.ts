import { useQuery } from 'react-query';

import { QUERY_GAMES } from '../../const/query.const';
import { MatchResponse } from '../../types/matchResponse';
import { useAxios } from '../useAxios';

export const useMatchListQuery = () => {
  const axios = useAxios();

  return useQuery<MatchResponse[]>(QUERY_GAMES, async () => {
    const response = await axios.get<MatchResponse[]>('games');

    return response.data;
  });
};
