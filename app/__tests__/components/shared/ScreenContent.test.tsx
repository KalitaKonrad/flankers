import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ScreenContent } from '../../../src/components/shared/ScreenContent';

describe('<ScreenContent>', () => {
  it('renders correctly', () => {
    const tree = render(<ScreenContent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
