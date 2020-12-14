import { useQuery } from 'react-query';

import { QUERY_PROFILE_KEY } from '../const/query.const';
import { useAxios } from './useAxios';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  current_team_id: number | null;
  teams: [];
  invites: [];
}

export const useUserProfile = () => {
  const axios = useAxios();

  return useQuery<UserProfile>(QUERY_PROFILE_KEY, async () => {
    const response = await axios.get<UserProfile>('user');
    return response.data;
  });
};
