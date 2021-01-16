import { useMutation, useQueryClient } from 'react-query';

import {
  QUERY_LEADERBOARDS_TEAM,
  QUERY_PROFILE_KEY,
  QUERY_TEAM_KEY,
} from '../const/query.const';
import { useAxios } from './useAxios';

interface TeamAvatarPayload {
  avatarUri: string;
  team_id: string;
}

export const useUpdateTeamAvatarMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

  return useMutation(
    ({ avatarUri, team_id }: TeamAvatarPayload) => {
      const uriParts = avatarUri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const formData = new FormData();
      formData.append('team_id', team_id);
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

      return axios.post(`teams/avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    {
      onSuccess: async () => {
        await queryCache.refetchQueries(QUERY_PROFILE_KEY, { active: true });
        await queryCache.refetchQueries(QUERY_TEAM_KEY, { active: true });
        await queryCache.refetchQueries(QUERY_LEADERBOARDS_TEAM, {
          active: true,
        });
      },
    }
  );
};
