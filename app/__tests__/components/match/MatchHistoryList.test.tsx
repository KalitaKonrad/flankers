import { render } from '@testing-library/react-native';
import React from 'react';

import { MatchHistoryList } from '../../../src/components/match/MatchHistoryList';

describe('<MatchHistoryList>', () => {
  it('should render correctly', () => {
    const tree = render(
      <MatchHistoryList onListEndReached={() => null} matchHistory={[]} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
