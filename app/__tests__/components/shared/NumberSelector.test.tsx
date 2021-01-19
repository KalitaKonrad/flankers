import { render } from '@testing-library/react-native';
import * as React from 'react';

import { NumberSelector } from '../../../src/components/shared/NumberSelector';

describe('<NumberSelector>', () => {
  it('renders correctly', () => {
    const tree = render(<NumberSelector />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
