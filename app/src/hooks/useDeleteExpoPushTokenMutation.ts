import { useMutation } from 'react-query';

import { useAxios } from './useAxios';

export const useDeleteExpoPushTokenMutation = () => {
  const axios = useAxios();

  return useMutation(({ expoPushToken }: { expoPushToken: string }) =>
    axios.delete('user/notifications', { data: { expo_token: expoPushToken } })
  );
};
