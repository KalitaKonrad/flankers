import { render } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';

import { RankingList } from '../../../src/components/ranking/RankingList';

describe('<RankingList>', () => {
  it('should render correctly', () => {
    const { toJSON } = render(
      <RankingList
        data={[]}
        buttonGroup={<View />}
        pageNumber={1}
        userId={1}
        userTeamId="test"
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
