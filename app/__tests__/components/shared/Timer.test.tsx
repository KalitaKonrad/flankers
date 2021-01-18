import { render } from '@testing-library/react-native';
import * as React from 'react';

import { Timer } from '../../../src/components/shared/Timer';

describe('<Timer>', () => {
  it('renders correctly', () => {
    const tree = render(<Timer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
