import { useMutation, useQueryCache } from 'react-query';

import { QUERY_USER_SETTINGS_KEY } from '../const/query.const';
import { useAxios } from './useAxios';

interface ProfileEditPayload {
  name: string;
  password: string;
}

export const useProfileEditMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryCache();

  return useMutation(
    (newProfileSettings: ProfileEditPayload) =>
      axios.patch('user/settings', {
        name: newProfileSettings.name,
        password: newProfileSettings.password,
      }),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(QUERY_USER_SETTINGS_KEY);
      },
    }
  );
};
