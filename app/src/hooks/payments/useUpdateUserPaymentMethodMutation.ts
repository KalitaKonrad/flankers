import { useMutation } from 'react-query';

import { useAxios } from '../useAxios';

export const useUpdateUserPaymentMethodMutation = () => {
  const axios = useAxios();
  return useMutation((paymentMethodKey: string) =>
    axios.post('payments/setup', {
      payment_method: paymentMethodKey,
    })
  );
};
