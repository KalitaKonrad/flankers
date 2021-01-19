import { render } from '@testing-library/react-native';
import * as React from 'react';

import RoundInformation from '../../../src/components/shared/RoundInformation';

describe('<RoundInformation>', () => {
  it('renders correctly', () => {
    const tree = render(<RoundInformation mainText="Test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
