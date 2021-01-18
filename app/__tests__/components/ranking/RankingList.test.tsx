import { render } from '@testing-library/react-native';
import * as React from 'react';
import { Button } from 'react-native';

import { RankingList } from '../../../src/components/ranking/RankingList';

describe('<RankingList>', () => {
  it('renders correctly when empty array with data provided', () => {
    const tree = render(
      <RankingList
        buttonGroup={<Button title="Hehe" onPress={() => null} />}
        data={[]}
        pageNumber={1}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly when all data provided', () => {
    const mockData = [
      {
        id: 5,
        name: 'hehe',
        description: 'string',
        owner_id: 5,
        updated_at: 'string',
        created_at: 'string',
        elo: 5,
        versioned_avatar: 'string',
      },
    ];

    const tree = render(
      <RankingList
        buttonGroup={<Button title="Hehe" onPress={() => null} />}
        data={mockData}
        pageNumber={2}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
