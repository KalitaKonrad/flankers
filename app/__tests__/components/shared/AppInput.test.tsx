import { render } from '@testing-library/react-native';
import * as React from 'react';

import { AppInput } from '../../../src/components/shared/AppInput';

describe('<AppInput>', () => {
  it('renders correctly', () => {
    const tree = render(<AppInput label="Test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
