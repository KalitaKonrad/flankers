import { useQuery } from 'react-query';

import { QUERY_GAMES_MEMOS } from '../../const/query.const';
import { GameScoreResponse } from '../../types/gameScoreResponse';
import { useAxios } from '../useAxios';

export const useGameScoreQuery = (gameId: number) => {
  const axios = useAxios();

  return useQuery<GameScoreResponse>(QUERY_GAMES_MEMOS, async () => {
    const response = await axios.get(`games/memos/${gameId}`);

    return response.data;
  });
};
