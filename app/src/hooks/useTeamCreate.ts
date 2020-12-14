import { useMutation, useQuery } from 'react-query';

import { QUERY_TEAM_KEY } from '../const/query.const';
import { useAxios } from './useAxios';

interface TeamCreate {
  name: string;
  description: string;
}

export const useTeamCreate = () => {
  const axios = useAxios();

  return useMutation((newTeam) => axios.post(QUERY_TEAM_KEY, newTeam));
};
