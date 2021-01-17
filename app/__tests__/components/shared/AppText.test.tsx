import { render } from '@testing-library/react-native';
import React from 'react';

import { AppText } from '../../../src/components/shared/AppText';

describe('<AppText>', () => {
  it('should render correctly', () => {
    const tree = render(<AppText>Test</AppText>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
