import { useMutation, useQueryClient } from 'react-query';

import { QUERY_GAMES_MEMOS } from '../const/query.const';
import { GameScorePayload } from '../types/gameScorePayload';
import { useAxios } from './useAxios';

export const useUpdateExistingMemoMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

  return useMutation(
    ({ game_id, score }: { game_id: number; score: GameScorePayload }) =>
      axios.put(`games/memos/${game_id}`, score),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(QUERY_GAMES_MEMOS);
      },
    }
  );
};
