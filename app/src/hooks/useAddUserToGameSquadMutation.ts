import { useMutation, useQueryClient } from 'react-query';

import { QUERY_GAME_SQUAD } from '../const/query.const';
import { useAxios } from './useAxios';

export const useAddUserToGameSquadMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

  return useMutation(
    ({ user_id, squad_id }: { user_id: number; squad_id: number }) =>
      axios.post('games/memberships', {
        user_id,
        squad_id,
      }),
    { onSuccess: () => queryCache.invalidateQueries(QUERY_GAME_SQUAD) }
  );
};
