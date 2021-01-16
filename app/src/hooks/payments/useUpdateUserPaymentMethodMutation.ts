import { queryCache, useMutation, useQueryCache } from 'react-query';

import {
  QUERY_USER_HAS_ACTIVE_PAYMENT_METHOD,
  QUERY_USER_WALLET,
} from '../../const/query.const';
import { useAxios } from '../useAxios';

export const useUpdateUserPaymentMethodMutation = () => {
  const axios = useAxios();
  const queryCache = useQueryCache();

  return useMutation(
    (paymentMethodKey: string) =>
      axios.post('payments/setup', {
        payment_method: paymentMethodKey,
      }),
    {
      onSuccess: () => {
        queryCache.setQueryData([QUERY_USER_HAS_ACTIVE_PAYMENT_METHOD], true);
      },
    }
  );
};
