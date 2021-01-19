import { render } from '@testing-library/react-native';
import * as React from 'react';

import { WalletTransactionHistoryList } from '../../../src/components/wallet/WalletTransactionHistoryList';
import { WalletChargeSource } from '../../../src/types/payments/wallet';

describe('<WalletTransactionHistoryList>', () => {
  it('renders correctly when empty data provided', () => {
    const tree = render(
      <WalletTransactionHistoryList transactions={[]} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when all data is provided', () => {
    const date = new Date('01/01/2021');
    const mockData = [
      {
        amount: '10',
        source: WalletChargeSource.GAME_WON,
        wallet_id: 5,
        created_at: date,
      },
    ];
    const tree = render(
      <WalletTransactionHistoryList transactions={mockData} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
