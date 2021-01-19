import { render } from '@testing-library/react-native';
import * as React from 'react';

import { PaddedInputScrollView } from '../../../src/components/layout/PaddedInputScrollView';

describe('<PaddedInputScrollView>', () => {
  it('should render correctly', () => {
    const tree = render(<PaddedInputScrollView />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
