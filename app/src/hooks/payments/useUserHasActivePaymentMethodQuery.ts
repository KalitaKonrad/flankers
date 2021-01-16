import { useQuery } from 'react-query';

import { QUERY_USER_HAS_ACTIVE_PAYMENT_METHOD } from '../../const/query.const';
import { useAxios } from '../useAxios';

interface UserHasActivePaymentMethodResponse {
  data: boolean;
  message: string;
}

export const useUserHasActivePaymentMethodQuery = () => {
  const axios = useAxios();
  return useQuery<boolean>(QUERY_USER_HAS_ACTIVE_PAYMENT_METHOD, async () => {
    const response = await axios.get<UserHasActivePaymentMethodResponse>(
      '/payments/active'
    );
    return response.data.data;
  });
};
