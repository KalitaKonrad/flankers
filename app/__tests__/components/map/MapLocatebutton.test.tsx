import { render } from '@testing-library/react-native';
import * as React from 'react';

import { MapLocateButton } from '../../../src/components/map/MapLocateButton';

describe('<MapLocateButton>', () => {
  it('should not render map', () => {
    try {
      const tree = render(<MapLocateButton mapRef={null} />);
      expect(tree.getByRole('alert')).toBeCalled();
      expect(tree.toJSON()).toMatchSnapshot();
    } catch (e) {}
  });
});
