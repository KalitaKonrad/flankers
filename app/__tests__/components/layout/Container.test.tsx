import { render } from '@testing-library/react-native';
import React from 'react';

import { Container } from '../../../src/components/layout/Container';

describe('<Container>', () => {
  it('should render correctly', () => {
    const tree = render(<Container />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
