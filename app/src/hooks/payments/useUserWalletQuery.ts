import { useQuery } from 'react-query';

import { QUERY_USER_WALLET } from '../../const/query.const';
import { Wallet } from '../../types/payments/wallet';
import { useAxios } from '../useAxios';

interface UserWalletResponse {
  data: Wallet;
}

export const useUserWalletQuery = () => {
  const axios = useAxios();
  return useQuery<Wallet>(QUERY_USER_WALLET, async () => {
    const response = await axios.get<UserWalletResponse>('/wallet');
    return response.data.data;
  });
};
