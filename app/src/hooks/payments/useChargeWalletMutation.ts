import { useMutation, useQueryClient } from 'react-query';

import { QUERY_USER_WALLET } from '../../const/query.const';
import { Wallet } from '../../types/payments/wallet';
import { useAxios } from '../useAxios';

interface ChargeWalletResponse {
  data: Wallet;
}

export const useChargeWalletMutation = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

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
        queryClient.setQueryData(QUERY_USER_WALLET, wallet);
      },
    }
  );
};
