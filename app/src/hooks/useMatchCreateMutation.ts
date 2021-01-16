import { useMutation, useQueryClient } from 'react-query';

import { QUERY_GAMES } from '../const/query.const';
import { MatchCreatePayload } from '../types/match';
import { MatchResponse } from '../types/matchResponse';
import { useAxios } from './useAxios';

export const useMatchCreateMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

  return useMutation(
    async (newMatch: MatchCreatePayload) => {
      const response = await axios.post<{ data: MatchResponse }>('games', {
        type: newMatch.type,
        rated: newMatch.isRated,
        public: newMatch.isPublic,
        bet: newMatch.bet,
        playersAmount: newMatch.playersAmount,
        long: newMatch.long,
        lat: newMatch.lat,
      });
      return response.data.data;
    },
    {
      onSuccess: () => {
        queryCache.invalidateQueries(QUERY_GAMES);
      },
      onError: (error) => {
        alert('Wystąpił błąd podczas tworzenia meczu');
      },
    }
  );
};
