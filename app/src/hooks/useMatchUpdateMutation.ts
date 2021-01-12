import { useMutation, useQueryCache } from 'react-query';

import { QUERY_GAMES } from '../const/query.const';
import { MatchCreatePayload } from '../types/match';
import { useAxios } from './useAxios';

export const useMatchUpdateMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryCache();

  return useMutation(
    ({
      game_id,
      newMatch,
    }: {
      game_id: number;
      newMatch: MatchCreatePayload;
    }) =>
      axios.put(`games/${game_id}`, {
        type: newMatch.type,
        rated: newMatch.isRated,
        public: newMatch.isPublic,
        bet: newMatch.bet,
        playersAmount: newMatch.playersAmount,
        long: newMatch.long,
        lat: newMatch.lat,
      }),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(QUERY_GAMES);
      },
    }
  );
};
