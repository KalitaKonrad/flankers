import { useMutation, useQuery, useQueryCache } from 'react-query';

import { QUERY_TEAM_KEY, QUERY_TEAM_MEMBERS } from '../const/query.const';
import { TeamProfilePayload } from '../types/teamProfile';
import { UserProfilePayload } from '../types/userProfilePayload';
import { useAxios } from './useAxios';

export type TeamMembersResponse = UserProfilePayload[];

export const useTeamProfileQuery = () => {
  const axios = useAxios();

  return useQuery<TeamProfilePayload>(QUERY_TEAM_KEY, async () => {
    const response = await axios.get<TeamProfilePayload>(QUERY_TEAM_KEY);
    return response.data;
  });
};
