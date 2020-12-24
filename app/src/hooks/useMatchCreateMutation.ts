import { LatLng } from 'react-native-maps';
import { useMutation, useQueryCache } from 'react-query';

import { QUERY_GAMES } from '../const/query.const';
import { useAxios } from './useAxios';

interface MatchCreatePayload {
  isTypeTeam: boolean;
  isRated: boolean;
  isPublic: boolean;
  bet: number;
  playersAmount: number;
  lat: number;
  long: number;
}

export const useMatchCreateMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryCache();

  return useMutation(
    (newMatch: MatchCreatePayload) =>
      axios.post('games', {
        type: newMatch.isTypeTeam,
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
