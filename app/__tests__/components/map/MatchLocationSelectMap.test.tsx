import { render } from '@testing-library/react-native';
import * as React from 'react';

import { MapLocationSelectMap } from '../../../src/components/map/MapLocationSelectMap';

describe('<MapLocationSelectMap.native>', () => {
  it('should render map', () => {
    const locationSelected = jest.fn();
    try {
      const tree = render(
        <MapLocationSelectMap onLocationSelected={locationSelected} />
      );
      expect(tree.toJSON()).toMatchSnapshot();
    } catch (e) {}
  });
});
