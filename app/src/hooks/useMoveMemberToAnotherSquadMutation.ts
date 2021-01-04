import { useMutation, useQueryCache } from 'react-query';

import { QUERY_GAME_SQUAD } from '../const/query.const';
import { useAxios } from './useAxios';

export const useMoveMemberToAnotherSquadMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryCache();

  return useMutation(
    ({
      user_id,
      squad_id,
      new_squad_id,
    }: {
      user_id: number;
      squad_id: number;
      new_squad_id: number;
    }) =>
      axios.put(`games/memberships/${squad_id}`, {
        new_squad_id,
        user_id,
      }),
    { onSuccess: () => queryCache.invalidateQueries(QUERY_GAME_SQUAD) }
  );
};
