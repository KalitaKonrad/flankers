import { useQuery } from 'react-query';

import { QUERY_PROFILE_KEY } from '../../const/query.const';
import { UserProfilePayload } from '../../types/userProfilePayload';
import { useAxios } from '../useAxios';

export const useUserProfileQuery = () => {
  const axios = useAxios();

  return useQuery<UserProfilePayload>(QUERY_PROFILE_KEY, async () => {
    const response = await axios.get<UserProfilePayload>('user');
    return response.data;
  });
};
