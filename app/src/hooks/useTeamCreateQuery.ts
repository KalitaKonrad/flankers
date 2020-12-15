import { useMutation, useQuery, useQueryCache } from 'react-query';

import { QUERY_TEAM_KEY } from '../const/query.const';
import { useAxios } from './useAxios';

interface TeamCreatePayload {
  name: string;
  description: string;
}

export const useTeamCreateQuery = () => {
  const axios = useAxios();

  const queryCache = useQueryCache();
  return useMutation(
    (newTeam: TeamCreatePayload) => axios.post(QUERY_TEAM_KEY, newTeam),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(QUERY_TEAM_KEY);
      },
      onError: (error) => {},
    }
  );
};
