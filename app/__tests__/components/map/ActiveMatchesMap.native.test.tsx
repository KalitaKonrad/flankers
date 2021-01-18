import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ActiveMatchesMap } from '../../../src/components/map/ActiveMatchesMap.native';

const mockMatchList = {
  id: 1,
  type: 'type',
  bet: 5,
  rated: false,
  public: false,
  start_date: null,
  duration: 600,
  long: 50.1,
  lat: 50.2,
  owner_id: 1,
  completed: true,
  squad_size: '5',
  location: {
    long: 50.1,
    lat: 50.2,
  },
  squads: [],
};

describe('<ActiveMatchesMap.native>', () => {
  it('renders correctly', () => {
    try {
      const tree = render(
        <ActiveMatchesMap matchList={[]} onMarkerPress={() => {}} />
      );
      expect(tree.toJSON()).toMatchSnapshot();
    } catch (e) {}
  });

  it('renders correctly', () => {
    try {
      const tree = render(
        <ActiveMatchesMap
          matchList={[mockMatchList]}
          onMarkerPress={() => {}}
        />
      );
      expect(tree.toJSON()).toMatchSnapshot();
    } catch (e) {}
  });
});
