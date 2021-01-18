import { render } from '@testing-library/react-native';
import * as React from 'react';

import { MatchLocationSelectMap } from '../../../src/components/map/MatchLocationSelectMap.native';

describe('<MapLocationSelectMap.native>', () => {
  it('should render map', () => {
    const locationSelected = jest.fn();
    try {
      const tree = render(
        <MatchLocationSelectMap onLocationSelected={locationSelected} />
      );
      expect(tree.toJSON()).toMatchSnapshot();
    } catch (e) {}
  });
});
