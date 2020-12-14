import { useQuery } from 'react-query';

import { QUERY_TEAM_KEY } from '../const/query.const';
import { useAxios } from './useAxios';

interface TeamProfile {
  id: number;
  name: string;
  description: string;
  owner_id: number;
  updated_at: string;
  created_at: string;
}

export const useTeamManage = () => {
  const axios = useAxios();

  return useQuery<TeamProfile>(QUERY_TEAM_KEY, async () => {
    const response = await axios.get<TeamProfile>(QUERY_TEAM_KEY);
    return response.data;
  });
};
