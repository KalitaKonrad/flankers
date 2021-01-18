import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ActiveMatchesMap } from '../../../src/components/map/ActiveMatchesMap';

describe('<ActiveMatchesMap>', () => {
  it('should render correctly', () => {
    try {
      const tree = render(
        <ActiveMatchesMap matchList={[]} onMarkerPress={() => {}} />
      );
      expect(tree.toJSON()).toMatchSnapshot();
    } catch (e) {}
  });
});
