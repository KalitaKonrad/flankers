import { useMutation, useQueryCache } from 'react-query';

import { QUERY_USER_AVATAR } from '../const/query.const';
import { useAxios } from './useAxios';

interface UpdateAvatarPayload {
  avatar: string;
}

export const useUpdateAvatarMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryCache();

  return useMutation(
    ({ avatar }: UpdateAvatarPayload) => axios.post(`user/avatar`, { avatar }),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(QUERY_USER_AVATAR);
      },
    }
  );
};
