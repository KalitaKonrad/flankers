import { render } from '@testing-library/react-native';
import * as React from 'React';

import { Container } from '../../../src/components/layout/Container';

describe('<Container>', () => {
  it('renders correctly', () => {
    const tree = render(<Container />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
