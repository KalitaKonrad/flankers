import { useMutation, useQueryClient } from 'react-query';

import { QUERY_GAMES } from '../../const/query.const';
import { useAxios } from '../useAxios';

export const useMatchUpdateMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

  return useMutation((game_id: number) => axios.delete(`games/${game_id}`), {
    onSuccess: () => {
      queryCache.invalidateQueries(QUERY_GAMES);
    },
  });
};
