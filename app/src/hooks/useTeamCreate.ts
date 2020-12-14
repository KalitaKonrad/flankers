import { useMutation, useQuery, useQueryCache } from 'react-query';

import { QUERY_TEAM_KEY } from '../const/query.const';
import { useAxios } from './useAxios';

interface TeamCreate {
  name: string;
  description: string;
}

export const useTeamCreate = () => {
  const axios = useAxios();

  const queryCache = useQueryCache();
  console.log('PROBUJE WYSLAC DANE');
  return useMutation(
    (newTeam: TeamCreate) => axios.post(QUERY_TEAM_KEY, newTeam),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(QUERY_TEAM_KEY);
        console.log('WYSLANOOOOOO');
      },
      onError: (error) => {
        console.log('KONDOIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
        console.log((error as any).response.data);
      },
    }
  );
};
