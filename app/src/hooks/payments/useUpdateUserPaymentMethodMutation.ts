import { useMutation, useQueryClient } from 'react-query';

import { QUERY_USER_HAS_ACTIVE_PAYMENT_METHOD } from '../../const/query.const';
import { useAxios } from '../useAxios';

export const useUpdateUserPaymentMethodMutation = () => {
  const axios = useAxios();
  const queryCache = useQueryClient();

  return useMutation(
    (paymentMethodKey: string) =>
      axios.post('payments/setup', {
        payment_method: paymentMethodKey,
      }),
    {
      onSuccess: () => {
        queryCache.setQueryData(QUERY_USER_HAS_ACTIVE_PAYMENT_METHOD, true);
      },
    }
  );
};
