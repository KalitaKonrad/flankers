import { useMutation, useQueryCache } from 'react-query';

import { QUERY_USER_WALLET } from '../../const/query.const';
import { Wallet } from '../../types/payments/wallet';
import { useAxios } from '../useAxios';

interface ChargeWalletResponse {
  data: Wallet;
}

export const useChargeWalletMutation = () => {
  const axios = useAxios();
  const queryCache = useQueryCache();

  return useMutation(
    async (amount: number) => {
      const response = await axios.post<ChargeWalletResponse>(
        '/wallet/charge',
        {
          amount,
        }
      );
      return response.data.data;
    },
    {
      onSuccess: (wallet) => {
        queryCache.setQueryData([QUERY_USER_WALLET], wallet);
      },
    }
  );
};
