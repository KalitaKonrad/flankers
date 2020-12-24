import { LatLng } from 'react-native-maps';
import { useMutation, useQueryCache } from 'react-query';

import { QUERY_GAMES } from '../const/query.const';
import { useAxios } from './useAxios';

interface MatchCreatePayload {
  typeTeam: boolean;
  rated: boolean;
  public: boolean;
  bet: number;
  lat: LatLng;
  long: LatLng;
}

export const useMatchCreateMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryCache();

  return useMutation(
    (newMatch: MatchCreatePayload) =>
      axios.post('games', {
        type: newMatch.typeTeam,
        rated: newMatch.rated,
        public: newMatch.public,
        bet: newMatch.bet,
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
