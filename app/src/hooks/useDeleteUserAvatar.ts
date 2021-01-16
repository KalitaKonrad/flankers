import { useMutation, useQueryClient } from 'react-query';

import { QUERY_USER_AVATAR } from '../const/query.const';
import { useAxios } from './useAxios';

export const useDeleteAvatarMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

  return useMutation(() => axios.delete('user/avatar'), {
    onSuccess: () => {
      queryCache.invalidateQueries(QUERY_USER_AVATAR);
    },
  });
};
