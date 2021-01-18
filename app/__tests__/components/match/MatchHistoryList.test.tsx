import { render } from '@testing-library/react-native';
import * as React from 'react';

import { MatchHistoryList } from '../../../src/components/match/MatchHistoryList';

describe('<MatchHistoryList>', () => {
  it('renders correctly when empty array with data provided', () => {
    const tree = render(
      <MatchHistoryList matchHistory={[]} onListEndReached={() => null} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly when valid data provided', () => {
    const mockData = [
      {
        winner: true,
        id: 5,
        type: 'hehe',
        updated_at: '21:37',
      },
    ];
    const tree = render(
      <MatchHistoryList matchHistory={mockData} onListEndReached={() => null} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
