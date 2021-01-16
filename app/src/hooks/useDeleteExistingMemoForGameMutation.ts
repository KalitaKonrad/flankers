import { useMutation, useQueryClient } from 'react-query';

import { QUERY_GAMES_MEMOS } from '../const/query.const';
import { useAxios } from './useAxios';

export const useDeleteExistingMemoForGameMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

  return useMutation(
    (game_id: number) => axios.post(`games/memos/${game_id}`),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(QUERY_GAMES_MEMOS);
      },
    }
  );
};
