import { render } from '@testing-library/react-native';
import * as React from 'react';

import { AppText } from '../../../src/components/shared/AppText';

describe('<AppText>', () => {
  it('renders correctly', () => {
    const tree = render(<AppText>Test</AppText>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
