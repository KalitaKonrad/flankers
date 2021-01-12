import { useMutation, useQueryCache } from 'react-query';

import { QUERY_USER_AVATAR } from '../const/query.const';
import { useAxios } from './useAxios';

export const useUpdateAvatarMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryCache();

  return useMutation(
    (avatarUri: string) => {
      const uriParts = avatarUri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const formData = new FormData();
      formData.append(
        'avatar',
        JSON.parse(
          JSON.stringify({
            uri: avatarUri,
            type: `image/${fileType}`,
            name: `avatar.${fileType}`,
          })
        )
      );

      return axios.post(`user/avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    {
      onSuccess: () => {
        queryCache.invalidateQueries(QUERY_USER_AVATAR);
      },
    }
  );
};
