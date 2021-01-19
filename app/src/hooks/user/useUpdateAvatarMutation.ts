import { useMutation, useQueryClient } from 'react-query';

import {
  QUERY_LEADERBOARDS_PLAYER,
  QUERY_PROFILE_KEY,
  QUERY_TEAM_MEMBERS,
} from '../../const/query.const';
import { useAxios } from '../useAxios';

export const useUpdateAvatarMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

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
        queryCache.refetchQueries(QUERY_PROFILE_KEY, { active: true });
        queryCache.refetchQueries(QUERY_LEADERBOARDS_PLAYER, { active: true });
        queryCache.refetchQueries(QUERY_TEAM_MEMBERS, { active: true });
      },
    }
  );
};
