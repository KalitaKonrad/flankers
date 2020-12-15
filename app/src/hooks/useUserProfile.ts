import { useQuery } from 'react-query';

import { QUERY_PROFILE_KEY } from '../const/query.const';
import { useAxios } from './useAxios';
import { TeamProfile } from './useTeamManage';

export interface UserProfilePayload {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  current_team_id: number | null;
  teams: TeamProfile[];
  invites: [];
}

export const useUserProfileQuery = () => {
  const axios = useAxios();

  return useQuery<UserProfilePayload>(QUERY_PROFILE_KEY, async () => {
    const response = await axios.get<UserProfilePayload>('user');
    return response.data;
  });
};
