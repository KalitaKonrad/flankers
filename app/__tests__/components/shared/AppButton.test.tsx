import { render } from '@testing-library/react-native';
import * as React from 'react';

import { AppButton } from '../../../src/components/shared/AppButton';

describe('<AppButton>', () => {
  it('renders correctly', () => {
    const tree = render(<AppButton>Test</AppButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
