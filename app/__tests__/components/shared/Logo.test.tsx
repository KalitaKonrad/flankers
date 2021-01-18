import { render } from '@testing-library/react-native';
import * as React from 'react';

import { Logo } from '../../../src/components/shared/Logo';

describe('<Logo>', () => {
  it('renders correctly', () => {
    const tree = render(<Logo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
