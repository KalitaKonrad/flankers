import { useMutation } from 'react-query';

import { useAxios } from '../useAxios';

export const useUpdateExpoPushTokenMutation = () => {
  const axios = useAxios();

  return useMutation(({ expoPushToken }: { expoPushToken: string }) =>
    axios.post('user/notifications', { expo_token: expoPushToken })
  );
};
