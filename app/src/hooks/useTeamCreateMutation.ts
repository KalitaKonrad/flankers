import { useMutation, useQueryCache } from 'react-query';

import { QUERY_TEAM_KEY } from '../const/query.const';
import { useAxios } from './useAxios';

interface TeamCreatePayload {
  name: string;
  description: string;
}

export const useTeamCreateMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryCache();
  return useMutation(
    (newTeam: TeamCreatePayload) => axios.post('teams', newTeam),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(QUERY_TEAM_KEY);
      },
      onError: (error) => {},
    }
  );
};
